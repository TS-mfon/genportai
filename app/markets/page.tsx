"use client";

import { Plus, Radar } from "lucide-react";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";
import { chainName } from "@/lib/chains";

export default function MarketsPage() {
  const { data, addToken } = useAppState();

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">CryptoRank-powered</p>
        <h1 className="mt-2 text-4xl font-black">Market radar</h1>
        <p className="mt-3 text-slate-400">Trending activity becomes AI suggestions when it matches your rules.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {data.marketEvents.map((event) => (
          <article key={event.id} className="surface rounded-2xl p-5">
            <Radar className="text-mint" size={24} />
            <h2 className="mt-4 text-xl font-black">{event.label}</h2>
            <p className="mt-2 text-sm text-slate-400">{event.token} · {chainName(event.chain)}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-white/6 p-3"><p className="text-slate-500">Move</p><p className="font-bold text-mint">{event.movePct}%</p></div>
              <div className="rounded-xl bg-white/6 p-3"><p className="text-slate-500">Volume</p><p className="font-bold">${(event.volumeUsd / 1000000).toFixed(1)}M</p></div>
              <div className="rounded-xl bg-white/6 p-3"><p className="text-slate-500">Risk</p><p className="font-bold text-amber">{event.risk}</p></div>
            </div>
            <button onClick={() => addToken("whitelist", event.token)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink">
              <Plus size={17} /> Allow AI to buy {event.token}
            </button>
          </article>
        ))}
      </div>
    </Shell>
  );
}
