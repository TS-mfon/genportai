"use client";

import { Beaker, Brain, Copy, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";
import type { UserPolicy } from "@/lib/types";

const presets: Array<[string, LucideIcon, string, Partial<UserPolicy>]> = [
  ["Balanced AI", Brain, "Diversified across majors, L2s, and stable reserves.", { mode: "approval_required" as const, maxTradeUsd: 1200, stopLossPct: 6, takeProfitPct: 15 }],
  ["Momentum Scout", Trophy, "Trades trending tokens only after volume confirmation.", { mode: "small_auto" as const, maxTradeUsd: 900, stopLossPct: 5, takeProfitPct: 18 }],
  ["Paper Lab", Beaker, "Tests strategies with no real funds before activation.", { mode: "suggest_only" as const, maxTradeUsd: 0, stopLossPct: 4, takeProfitPct: 10 }],
  ["Copy Template", Copy, "Follow public strategy templates and tune risk.", { mode: "approval_required" as const, maxTradeUsd: 500, stopLossPct: 4, takeProfitPct: 12 }]
];

export default function StrategyPage() {
  const { updatePolicy } = useAppState();
  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Simple strategy presets</p>
        <h1 className="mt-2 text-4xl font-black">Strategy builder</h1>
        <p className="mt-3 text-slate-400">Choose a preset now. You can customize the rules in Settings.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {presets.map(([title, Icon, description, patch]) => (
          <article key={String(title)} className="surface rounded-2xl p-5">
            <Icon className="text-mint" size={24} />
            <h2 className="mt-4 text-xl font-black">{String(title)}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{String(description)}</p>
            <button onClick={() => updatePolicy(patch)} className="mt-4 w-full rounded-xl bg-mint px-4 py-3 font-bold text-ink">Use this strategy</button>
          </article>
        ))}
      </div>
    </Shell>
  );
}
