"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Shell } from "@/components/Shell";
import { chains } from "@/lib/chains";
import { useAppState } from "@/lib/app-state";

const goals = ["Preserve capital", "Steady growth", "High growth", "Active trading"];
const risks = ["Low", "Medium", "High", "Very high"];
const sectors = ["Majors", "DeFi", "AI", "Gaming", "L2s", "Stablecoins"];

export default function OnboardingPage() {
  const { data, updatePolicy, addToken } = useAppState();

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">First-time setup</p>
        <h1 className="mt-2 text-4xl font-black">Tell the AI how to trade for you</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          No technical knowledge needed. Pick the closest answers, then fund one of your vaults.
        </p>
      </div>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">1. What is your goal?</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {goals.map((goal) => <button key={goal} className="rounded-xl border border-white/10 bg-white/7 px-4 py-4 text-left font-bold hover:border-mint/50">{goal}</button>)}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">2. How much risk can you accept?</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {risks.map((risk) => <button key={risk} className="rounded-xl border border-white/10 bg-white/7 px-4 py-4 text-left font-bold hover:border-mint/50">{risk}</button>)}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">3. Choose chains to fund</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {Object.entries(chains).map(([key, chain]) => (
                <Link key={key} href="/vaults" className="rounded-xl border border-white/10 bg-white/7 px-4 py-4 hover:border-cyan/50">
                  <p className="font-bold">{chain.name}</p>
                  <p className="mt-1 text-xs text-slate-400">Needs {chain.nativeSymbol} gas</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">4. Pick token categories</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {sectors.map((sector) => <button key={sector} className="rounded-xl border border-white/10 bg-white/7 px-4 py-4 text-left font-bold hover:border-mint/50">{sector}</button>)}
            </div>
          </div>
        </div>

        <aside className="surface rounded-2xl p-5">
          <h2 className="text-xl font-black">Recommended safe setup</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Ask approval before large trades.</p>
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Keep at least ${data.policy.minBalanceUsd.toLocaleString()} untouched.</p>
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Keep native gas on every funded chain.</p>
          </div>
          <button
            onClick={() => {
              updatePolicy({ mode: "approval_required", maxTradeUsd: 1000, stopLossPct: 6, takeProfitPct: 15 });
              ["ETH", "BTC", "USDC"].forEach((token) => addToken("whitelist", token));
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink"
          >
            Use safe setup <ArrowRight size={17} />
          </button>
          <Link href="/vaults" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 font-bold text-cyan">
            Deposit funds
          </Link>
        </aside>
      </section>
    </Shell>
  );
}
