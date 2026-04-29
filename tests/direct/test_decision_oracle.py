import json


def test_record_decision_hash(direct_deploy, direct_vm, direct_owner):
    contract = direct_deploy("contracts/genport_ai_decision_oracle.py")
    direct_vm.sender = direct_owner

    contract.record_decision_hash("batch_1", "0xabc", "suggestion_batch", "2026-04-29T15:00:00Z")

    record = contract.get_decision_hash("batch_1")
    assert record["decision_hash"] == "0xabc"
    assert record["kind"] == "suggestion_batch"


def test_generate_suggestions_requires_five_items(direct_deploy, direct_vm, direct_owner):
    contract = direct_deploy("contracts/genport_ai_decision_oracle.py")
    direct_vm.sender = direct_owner

    direct_vm.mock_llm(
        r".*Generate exactly 5 portfolio suggestions.*",
        json.dumps(
            {
                "suggestions": [
                    {
                        "token": "ETH",
                        "chain": "ethereum",
                        "action": "buy",
                        "confidence": 82,
                        "risk": 28,
                        "amount_policy": "within max trade",
                        "trigger": "large-cap momentum",
                        "reason": "ETH momentum is aligned with the segment policy.",
                        "take_profit_pct": 15,
                        "stop_loss_pct": 6,
                    },
                    {
                        "token": "AERO",
                        "chain": "base",
                        "action": "take_profit",
                        "confidence": 79,
                        "risk": 54,
                        "amount_policy": "partial trim",
                        "trigger": "volume spike",
                        "reason": "Reduce concentration after a strong move.",
                        "take_profit_pct": 20,
                        "stop_loss_pct": 8,
                    },
                    {
                        "token": "USDC",
                        "chain": "base",
                        "action": "rebalance",
                        "confidence": 75,
                        "risk": 10,
                        "amount_policy": "increase reserve",
                        "trigger": "risk elevated",
                        "reason": "Improve optionality and reduce drawdown risk.",
                        "take_profit_pct": 0,
                        "stop_loss_pct": 0,
                    },
                    {
                        "token": "ARB",
                        "chain": "arbitrum",
                        "action": "hold",
                        "confidence": 68,
                        "risk": 35,
                        "amount_policy": "no trade",
                        "trigger": "insufficient edge",
                        "reason": "No trade after costs.",
                        "take_profit_pct": 12,
                        "stop_loss_pct": 7,
                    },
                    {
                        "token": "BNB",
                        "chain": "bnb",
                        "action": "watch",
                        "confidence": 66,
                        "risk": 32,
                        "amount_policy": "watch only",
                        "trigger": "trend forming",
                        "reason": "Wait for confirmation.",
                        "take_profit_pct": 12,
                        "stop_loss_pct": 6,
                    },
                ]
            }
        ),
    )

    result = contract.generate_suggestions("balanced", "0xsnap", "0xpolicy", "ipfs://ctx", "compact market data")
    assert len(result["suggestions"]) == 5
    assert result["suggestions"][0]["token"] == "ETH"
