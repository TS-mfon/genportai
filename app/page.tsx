"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bot, History, Mail, Radar, ShieldCheck, Sparkles, Vault, Wallet } from "lucide-react";
import { useAppState } from "@/lib/app-state";

export default function HomePage() {
  const { data, signInWithEmail, connectWallet } = useAppState();
  const [email, setEmail] = useState("");

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
          <Link href={data.user.signedIn ? "/onboarding" : "/"} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-ink">
            {data.user.signedIn ? "Continue" : "Sign in first"}
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_480px]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 text-sm text-mint">
              <Sparkles size={16} />
              AI proposes trades only after market analysis
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Set your rules. Fund your vault. Let AI propose actions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              GenPortAI starts empty, then builds around your email, wallet, vault deposits, and AI-generated suggestions.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              {[
                ["Smart vaults", Vault],
                ["Chat history", Bot],
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

          <aside className="surface rounded-3xl p-5 shadow-glow">
            <h2 className="text-2xl font-black">Create your account</h2>
            <p className="mt-2 text-sm text-slate-400">Use email, wallet, or both. This unlocks onboarding and deposit setup.</p>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="text-sm text-slate-400">Email</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 outline-none focus:border-mint/60" />
              </label>
              <button onClick={() => signInWithEmail(email)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink">
                <Mail size={17} /> Continue with email
              </button>
              <button onClick={connectWallet} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 font-bold text-cyan">
                <Wallet size={17} /> Connect wallet
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-white/6 p-4 text-sm text-slate-300">
              <p>Email: {data.user.email || "Not connected"}</p>
              <p className="mt-2 break-all">Wallet: {data.user.walletAddress || "Not connected"}</p>
            </div>

            <Link href={data.user.signedIn ? "/onboarding" : "/"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-ink">
              Start setup <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
