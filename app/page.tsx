import Link from "next/link";
import { ArrowRight, Bot, History, Radar, ShieldCheck, Sparkles, Vault } from "lucide-react";
import { getDashboardData } from "@/lib/api";
import { SuggestionCard } from "@/components/SuggestionCard";

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen overflow-hidden grid-bg">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint/15 text-mint">
              <ShieldCheck size={23} />
            </span>
            <span className="text-xl font-black">GenPortAI</span>
          </div>
          <Link href="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-bold text-ink">
            Open App
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_520px]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 text-sm text-mint">
              <Sparkles size={16} />
              5 AI suggestions every hour, plus urgent market alerts
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              AI portfolio control for multi-chain vaults.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              GenPortAI blends GenLayer decision consensus, CryptoRank market intelligence, DEX execution,
              chat history, action history, and policy-controlled vault automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/onboarding" className="inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-3 font-bold text-ink">
                Start onboarding <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-5 py-3 font-bold">
                View cockpit
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                ["Smart vaults", Vault],
                ["AI chat memory", Bot],
                ["Action replay", History],
                ["Market radar", Radar]
              ].map(([label, Icon]) => (
                <div key={String(label)} className="surface rounded-2xl p-4">
                  <Icon className="text-mint" size={20} />
                  <p className="mt-3 text-sm font-bold">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="surface rounded-3xl p-4 shadow-glow">
            <div className="rounded-2xl bg-ink/80 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Portfolio value</p>
                  <p className="text-4xl font-black">${data.portfolioValueUsd.toLocaleString()}</p>
                </div>
                <span className="rounded-full bg-mint/12 px-3 py-1 text-sm text-mint">ROI +{data.roiPct}%</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/7 p-3">
                  <p className="text-xs text-slate-500">AI Score</p>
                  <p className="text-xl font-black">{data.aiScore}</p>
                </div>
                <div className="rounded-xl bg-white/7 p-3">
                  <p className="text-xs text-slate-500">Risk</p>
                  <p className="text-xl font-black">{data.riskScore}</p>
                </div>
                <div className="rounded-xl bg-white/7 p-3">
                  <p className="text-xs text-slate-500">Gas</p>
                  <p className="text-xl font-black">{data.gasHealth}</p>
                </div>
              </div>
              <div className="mt-5">
                <SuggestionCard suggestion={data.suggestions[0]} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
