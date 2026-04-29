import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, Eye, RefreshCw, ShieldAlert } from "lucide-react";
import { chainName } from "@/lib/chains";
import type { Suggestion } from "@/lib/types";

const actionIcon = {
  buy: ArrowUpRight,
  sell: ArrowDownRight,
  hold: Eye,
  rebalance: RefreshCw,
  take_profit: CheckCircle2,
  stop_loss: ShieldAlert,
  watch: Clock
};

export function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const Icon = actionIcon[suggestion.action];

  return (
    <article className="surface rounded-2xl p-5 transition hover:border-mint/40 hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/8 text-mint">
            <Icon size={20} />
          </span>
          <div>
            <h3 className="font-bold">{suggestion.action.replace("_", " ").toUpperCase()} {suggestion.token}</h3>
            <p className="text-sm text-slate-400">{chainName(suggestion.chain)} · ${suggestion.amountUsd.toLocaleString()}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{suggestion.status.replace("_", " ")}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{suggestion.reason}</p>
      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl bg-white/6 p-3">
          <p className="text-slate-500">Confidence</p>
          <p className="font-bold text-mint">{suggestion.confidence}%</p>
        </div>
        <div className="rounded-xl bg-white/6 p-3">
          <p className="text-slate-500">Risk</p>
          <p className="font-bold text-amber">{suggestion.risk}/100</p>
        </div>
        <div className="rounded-xl bg-white/6 p-3">
          <p className="text-slate-500">Stop</p>
          <p className="font-bold text-coral">{suggestion.stopLossPct}%</p>
        </div>
      </div>
    </article>
  );
}
