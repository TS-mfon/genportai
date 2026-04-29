# { "Depends": "py-genlayer:latest" }

import json
from dataclasses import dataclass
from genlayer import *


ERROR_EXPECTED = "[EXPECTED]"
ERROR_LLM = "[LLM_ERROR]"


@allow_storage
@dataclass
class DecisionRecord:
    decision_id: str
    decision_hash: str
    kind: str
    created_at: str


class GenPortAIDecisionOracle(gl.Contract):
    owner: Address
    decision_hashes: TreeMap[str, DecisionRecord]
    decision_order: DynArray[str]

    def __init__(self):
        self.owner = gl.message.sender_address

    def _only_owner(self) -> None:
        if gl.message.sender_address != self.owner:
            raise gl.UserError(f"{ERROR_EXPECTED} only owner")

    @gl.public.write
    def record_decision_hash(self, decision_id: str, decision_hash: str, kind: str, created_at: str) -> None:
        self._only_owner()
        if not decision_id or not decision_hash:
            raise gl.UserError(f"{ERROR_EXPECTED} missing decision id or hash")
        self.decision_hashes[decision_id] = DecisionRecord(
            decision_id=decision_id,
            decision_hash=decision_hash,
            kind=kind,
            created_at=created_at,
        )
        self.decision_order.append(decision_id)

    @gl.public.view
    def get_decision_hash(self, decision_id: str) -> dict:
        record = self.decision_hashes[decision_id]
        return {
            "decision_id": record.decision_id,
            "decision_hash": record.decision_hash,
            "kind": record.kind,
            "created_at": record.created_at,
        }

    @gl.public.write
    def generate_suggestions(
        self,
        segment_id: str,
        market_snapshot_hash: str,
        policy_hash: str,
        context_uri: str,
        compact_context: str,
    ) -> dict:
        if not segment_id or not market_snapshot_hash or not policy_hash:
            raise gl.UserError(f"{ERROR_EXPECTED} missing required suggestion context")

        prompt = f"""
You are GenPortAI, an AI portfolio decision oracle.
Generate exactly 5 portfolio suggestions for a segment of users.

Hard rules:
- Return valid JSON only.
- Return exactly 5 suggestions.
- Each suggestion must include: token, chain, action, confidence, risk, amount_policy, trigger, reason, take_profit_pct, stop_loss_pct.
- Actions must be one of: buy, sell, hold, rebalance, take_profit, stop_loss, watch.
- Do not recommend blacklisted, illiquid, unsupported, or extreme-risk tokens.
- Prefer suggestions that can be personalized by a backend using balances and user settings.
- Mention if approval should be required for high-risk or large actions.

Segment id: {segment_id}
Market snapshot hash: {market_snapshot_hash}
Policy hash: {policy_hash}
Context URI: {context_uri}
Compact context:
{compact_context}
"""

        def leader_fn() -> dict:
            raw = gl.nondet.exec_prompt(prompt, response_format="json")
            if not isinstance(raw, dict):
                raise gl.vm.UserError(f"{ERROR_LLM} response was not a JSON object")
            suggestions = raw.get("suggestions")
            if not isinstance(suggestions, list) or len(suggestions) != 5:
                raise gl.vm.UserError(f"{ERROR_LLM} expected exactly 5 suggestions")
            normalized = []
            for item in suggestions:
                if not isinstance(item, dict):
                    raise gl.vm.UserError(f"{ERROR_LLM} suggestion must be object")
                normalized.append(
                    {
                        "token": str(item.get("token", ""))[:24],
                        "chain": str(item.get("chain", ""))[:24],
                        "action": str(item.get("action", ""))[:24],
                        "confidence": int(item.get("confidence", 0)),
                        "risk": int(item.get("risk", 0)),
                        "amount_policy": str(item.get("amount_policy", ""))[:120],
                        "trigger": str(item.get("trigger", ""))[:240],
                        "reason": str(item.get("reason", ""))[:700],
                        "take_profit_pct": int(item.get("take_profit_pct", 0)),
                        "stop_loss_pct": int(item.get("stop_loss_pct", 0)),
                    }
                )
            return {
                "segment_id": segment_id,
                "market_snapshot_hash": market_snapshot_hash,
                "policy_hash": policy_hash,
                "suggestions": normalized,
            }

        def validator_fn(leaders_res: gl.vm.Result) -> bool:
            if not isinstance(leaders_res, gl.vm.Return):
                return False
            try:
                candidate = leader_fn()
            except Exception:
                return False
            leader = leaders_res.calldata
            if leader.get("segment_id") != candidate.get("segment_id"):
                return False
            if len(leader.get("suggestions", [])) != 5 or len(candidate.get("suggestions", [])) != 5:
                return False
            leader_actions = [str(item.get("action", "")) for item in leader["suggestions"]]
            candidate_actions = [str(item.get("action", "")) for item in candidate["suggestions"]]
            allowed = {"buy", "sell", "hold", "rebalance", "take_profit", "stop_loss", "watch"}
            if any(action not in allowed for action in leader_actions):
                return False
            overlap = len(set(leader_actions).intersection(set(candidate_actions)))
            return overlap >= 2

        return gl.vm.run_nondet_unsafe(leader_fn, validator_fn)

    @gl.public.write
    def validate_action(
        self,
        action_hash: str,
        policy_hash: str,
        market_snapshot_hash: str,
        compact_action_context: str,
    ) -> dict:
        if not action_hash or not policy_hash or not market_snapshot_hash:
            raise gl.UserError(f"{ERROR_EXPECTED} missing validation context")

        prompt = f"""
Validate this proposed GenPortAI trading action.
Return JSON only with: approved(boolean), risk(integer 0-100), reason(string), requires_human_approval(boolean).
Reject if the action violates the policy, gas reserve, whitelist/blacklist, max trade size, liquidity, slippage, or safety constraints.

Action hash: {action_hash}
Policy hash: {policy_hash}
Market snapshot hash: {market_snapshot_hash}
Action context:
{compact_action_context}
"""

        def leader_fn() -> dict:
            raw = gl.nondet.exec_prompt(prompt, response_format="json")
            if not isinstance(raw, dict):
                raise gl.vm.UserError(f"{ERROR_LLM} response was not JSON")
            approved = bool(raw.get("approved", False))
            risk = int(raw.get("risk", 100))
            return {
                "action_hash": action_hash,
                "approved": approved,
                "risk": max(0, min(100, risk)),
                "reason": str(raw.get("reason", ""))[:700],
                "requires_human_approval": bool(raw.get("requires_human_approval", not approved or risk > 40)),
            }

        def validator_fn(leaders_res: gl.vm.Result) -> bool:
            if not isinstance(leaders_res, gl.vm.Return):
                return False
            try:
                candidate = leader_fn()
            except Exception:
                return False
            leader = leaders_res.calldata
            if leader.get("action_hash") != action_hash:
                return False
            if bool(leader.get("approved")) != bool(candidate.get("approved")):
                return False
            return abs(int(leader.get("risk", 100)) - int(candidate.get("risk", 100))) <= 30

        return gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
