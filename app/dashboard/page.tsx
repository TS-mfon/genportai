"use client";

import Link from "next/link";
import { Activity, BadgeDollarSign, Check, Gauge, Play, ShieldCheck, X } from "lucide-react";
import { ActionTimeline } from "@/components/ActionTimeline";
import { MetricCard } from "@/components/MetricCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { Shell } from "@/components/Shell";
import { SuggestionCard } from "@/components/SuggestionCard";
import { chainName } from "@/lib/chains";
import { useAppState } from "@/lib/app-state";

export default function DashboardPage() {
  const { data, approveSuggestion, rejectSuggestion, executeSuggestion } = useAppState();

  return (
    <Shell>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">AI portfolio cockpit</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Dashboard</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Start here. Review the AI suggestions, approve what you like, reject what you do not, and adjust your rules in Settings.
        </p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Portfolio Value" value={`$${data.portfolioValueUsd.toLocaleString()}`} change={`ROI +${data.roiPct}% all time`} icon={BadgeDollarSign} />
        <MetricCard label="PNL" value={`$${data.pnlUsd.toLocaleString()}`} change="Updated from indexed vault receipts" icon={Activity} tone="cyan" />
        <MetricCard label="AI Score" value={`${data.aiScore}/100`} change="Health, diversification, gas and trend alignment" icon={ShieldCheck} />
        <MetricCard label="Risk" value={`${data.riskScore}/100`} change="Below configured max drawdown" icon={Gauge} tone="amber" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <article className="surface rounded-2xl p-5">
          <h2 className="text-xl font-black">Portfolio curve</h2>
          <p className="text-sm text-slate-400">Your value and PNL over time.</p>
          <PortfolioChart data={data.portfolioHistory} />
          {data.portfolioHistory.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-5 text-sm text-slate-300">
              No portfolio history yet. Connect a wallet, finish onboarding, and deposit into a vault.
              <Link href="/vaults" className="ml-2 font-bold text-mint">Go to vaults</Link>
            </div>
          ) : null}
        </article>

        <article className="surface rounded-2xl p-5">
          <h2 className="text-xl font-black">Holdings</h2>
          <div className="mt-4 space-y-3">
            {data.holdings.map((holding) => (
              <div key={`${holding.chain}-${holding.symbol}`} className="flex items-center justify-between rounded-xl bg-white/6 p-3">
                <div>
                  <p className="font-bold">{holding.symbol}</p>
                  <p className="text-xs text-slate-400">{chainName(holding.chain)} · {holding.allocation}%</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${holding.valueUsd.toLocaleString()}</p>
                  <p className={holding.pnl24h >= 0 ? "text-xs text-mint" : "text-xs text-coral"}>{holding.pnl24h}% 24h</p>
                </div>
              </div>
            ))}
          </div>
          {data.holdings.length === 0 ? <p className="mt-4 rounded-xl bg-white/6 p-4 text-sm text-slate-400">No holdings detected yet.</p> : null}
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_.85fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">5 AI suggestions</h2>
              <p className="text-sm text-slate-400">One-click controls update your action history immediately.</p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">Hourly batch</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data.suggestions.map((suggestion) => (
              <div key={suggestion.id}>
                <SuggestionCard suggestion={suggestion} />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button onClick={() => approveSuggestion(suggestion.id)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-mint px-3 py-3 text-sm font-bold text-ink">
                    <Check size={16} /> Approve
                  </button>
                  <button onClick={() => rejectSuggestion(suggestion.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-coral/40 bg-coral/10 px-3 py-3 text-sm font-bold text-coral">
                    <X size={16} /> Reject
                  </button>
                  <button onClick={() => executeSuggestion(suggestion.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-3 py-3 text-sm font-bold text-cyan">
                    <Play size={16} /> Execute
                  </button>
                </div>
              </div>
            ))}
          </div>
          {data.suggestions.length === 0 ? (
            <div className="surface rounded-2xl p-6 text-slate-300">
              No AI suggestions yet. AI proposals appear here only after CryptoRank market data and GenLayer analysis run.
            </div>
          ) : null}
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-black">Agent action history</h2>
          <ActionTimeline actions={data.actions} />
        </div>
      </section>
    </Shell>
  );
}
