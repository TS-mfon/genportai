"use client";

import Link from "next/link";
import { ArrowRight, Bot, History, KeyRound, Radar, ShieldCheck, Sparkles, Vault, Wallet } from "lucide-react";
import { useAppState } from "@/lib/app-state";

export default function HomePage() {
  const { data, connectWallet, generateAgentWallet } = useAppState();
  const ready = Boolean(data.user.walletAddress && data.user.agentWalletAddress);

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
          <Link href={ready ? "/onboarding" : "/"} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-ink">
            {ready ? "Continue setup" : "Connect wallet"}
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_500px]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 text-sm text-mint">
              <Sparkles size={16} />
              Wallet-bound AI trading account
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Your wallet owns it. The agent wallet can act.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Connect your owner wallet, generate a dedicated agent wallet, answer the setup questions, then let GenLayer propose market actions.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              {[
                ["Agent wallet", KeyRound],
                ["Smart vaults", Vault],
                ["AI chat", Bot],
                ["Action history", History],
                ["Market radar", Radar]
              ].map(([label, Icon]) => (
                <div key={String(label)} className="surface rounded-2xl p-4">
                  <Icon className="text-mint" size={20} />
                  <p className="mt-3 text-sm font-bold">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="surface rounded-3xl p-6 shadow-glow">
            <h2 className="text-2xl font-black">Start with wallet</h2>
            <p className="mt-2 text-sm text-slate-400">
              Email login is removed. Your connected wallet is the owner. The generated agent wallet is the account the AI can operate with.
            </p>

            <div className="mt-5 space-y-3">
              <button onClick={connectWallet} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink">
                <Wallet size={17} /> Connect owner wallet
              </button>
              <button onClick={generateAgentWallet} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 font-bold text-cyan">
                <KeyRound size={17} /> Generate agent wallet
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-2xl bg-white/6 p-4 text-sm text-slate-300">
              <p className="break-all">Owner wallet: {data.user.walletAddress || "Not connected"}</p>
              <p className="break-all">Agent wallet: {data.user.agentWalletAddress || "Not generated"}</p>
            </div>

            <Link href={ready ? "/onboarding" : "/"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-ink">
              Answer setup questions <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
