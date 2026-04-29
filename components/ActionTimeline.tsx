import { AlertCircle, CheckCircle2, Clock, Sparkles, XCircle } from "lucide-react";
import { chainName } from "@/lib/chains";
import type { AgentAction } from "@/lib/types";

const icons = {
  suggested: Sparkles,
  waiting: Clock,
  approved: CheckCircle2,
  executed: CheckCircle2,
  failed: AlertCircle,
  rejected: XCircle
};

export function ActionTimeline({ actions }: { actions: AgentAction[] }) {
  return (
    <div className="space-y-3">
      {actions.map((action) => {
        const Icon = icons[action.status];
        return (
          <article key={action.id} className="surface rounded-2xl p-5">
            <div className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/8 text-cyan">
                <Icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">{action.title}</h3>
                  <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-300">{action.status}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{action.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span>{chainName(action.chain)}</span>
                  <span>·</span>
                  <span>{action.token}</span>
                  <span>·</span>
                  <span>${action.amountUsd.toLocaleString()}</span>
                  <span>·</span>
                  <span>{action.source.replaceAll("_", " ")}</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
