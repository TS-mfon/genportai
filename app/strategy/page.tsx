"use client";

import Link from "next/link";
import { Brain, Lock, Settings } from "lucide-react";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";

export default function StrategyPage() {
  const { data } = useAppState();

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">AI-only proposals</p>
        <h1 className="mt-2 text-4xl font-black">Strategy</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          There are no presets. Users only set limits; AI is the only actor allowed to propose trades after market analysis.
        </p>
      </div>

      <section className="grid gap-5 xl:grid-cols-3">
        <article className="surface rounded-2xl p-5">
          <Lock className="text-mint" size={26} />
          <h2 className="mt-4 text-xl font-black">Your current rule</h2>
          <p className="mt-2 text-sm text-slate-400">Mode: {data.policy.mode.replace("_", " ")}</p>
          <p className="mt-2 text-sm text-slate-400">Max trade: ${data.policy.maxTradeUsd.toLocaleString()}</p>
          <Link href="/settings" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink">
            <Settings size={17} /> Edit limits
          </Link>
        </article>

        <article className="surface rounded-2xl p-5 xl:col-span-2">
          <Brain className="text-cyan" size={26} />
          <h2 className="mt-4 text-xl font-black">How proposals are created</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white/6 p-4">
              <p className="font-bold">1. Market scan</p>
              <p className="mt-2 text-sm text-slate-400">CryptoRank data is normalized by workers.</p>
            </div>
            <div className="rounded-xl bg-white/6 p-4">
              <p className="font-bold">2. GenLayer analysis</p>
              <p className="mt-2 text-sm text-slate-400">The deployed AI oracle generates suggestions.</p>
            </div>
            <div className="rounded-xl bg-white/6 p-4">
              <p className="font-bold">3. User approval</p>
              <p className="mt-2 text-sm text-slate-400">You approve or reject before execution unless automation is enabled.</p>
            </div>
          </div>
        </article>
      </section>
    </Shell>
  );
}
