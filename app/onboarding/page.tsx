"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Shell } from "@/components/Shell";
import { chains } from "@/lib/chains";
import { useAppState } from "@/lib/app-state";
import type { ChainKey } from "@/lib/types";

const goals = ["Preserve capital", "Steady growth", "High growth", "Active trading"];
const risks = ["Low", "Medium", "High", "Very high"];
const sectors = ["Majors", "DeFi", "AI", "Gaming", "L2s", "Stablecoins"];

function choiceClass(selected: boolean) {
  return selected
    ? "rounded-xl border border-mint bg-mint/15 px-4 py-4 text-left font-bold text-mint shadow-glow"
    : "rounded-xl border border-white/10 bg-white/7 px-4 py-4 text-left font-bold text-slate-100 hover:border-mint/50";
}

export default function OnboardingPage() {
  const { data, updatePolicy, addToken, completeOnboarding, updateProfile, toggleProfileChain, toggleProfileSector } = useAppState();
  const profile = data.user.profile;

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">First-time setup</p>
        <h1 className="mt-2 text-4xl font-black">Tell the AI how to trade for you</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Select answers below. The selected cards stay highlighted and become part of the policy context sent to GenLayer.
        </p>
      </div>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">1. What is your goal?</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {goals.map((goal) => (
                <button key={goal} onClick={() => updateProfile({ goal })} className={choiceClass(profile.goal === goal)}>
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">2. How much risk can you accept?</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {risks.map((risk) => (
                <button key={risk} onClick={() => updateProfile({ risk })} className={choiceClass(profile.risk === risk)}>
                  {risk}
                </button>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">3. Choose chains to fund</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {Object.entries(chains).map(([key, chain]) => {
                const chainKey = key as ChainKey;
                return (
                  <button key={key} onClick={() => toggleProfileChain(chainKey)} className={choiceClass(profile.chains.includes(chainKey))}>
                    <p>{chain.name}</p>
                    <p className="mt-1 text-xs text-slate-400">Needs {chain.nativeSymbol} gas</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xl font-black">4. Pick token categories</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {sectors.map((sector) => (
                <button key={sector} onClick={() => toggleProfileSector(sector)} className={choiceClass(profile.sectors.includes(sector))}>
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="surface rounded-2xl p-5">
          <h2 className="text-xl font-black">Setup summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Goal: {profile.goal || "Choose one"}</p>
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Risk: {profile.risk || "Choose one"}</p>
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Chains: {profile.chains.length ? profile.chains.join(", ") : "Choose at least one"}</p>
            <p className="flex gap-2"><CheckCircle2 className="text-mint" size={18} /> Sectors: {profile.sectors.length ? profile.sectors.join(", ") : "Optional"}</p>
          </div>
          <button
            onClick={() => {
              updatePolicy({ mode: "approval_required", maxTradeUsd: 1000, stopLossPct: 6, takeProfitPct: 15 });
              ["ETH", "BTC", "USDC"].forEach((token) => addToken("whitelist", token));
              completeOnboarding();
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink"
          >
            Save AI rules <ArrowRight size={17} />
          </button>
          <Link href="/vaults" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 font-bold text-cyan">
            Continue to deposit
          </Link>
        </aside>
      </section>
    </Shell>
  );
}
