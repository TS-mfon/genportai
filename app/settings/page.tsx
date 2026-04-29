"use client";

import { useState } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";
import type { AutomationMode } from "@/lib/types";

function TokenEditor({
  title,
  helper,
  tokens,
  onAdd,
  onRemove
}: {
  title: string;
  helper: string;
  tokens: string[];
  onAdd: (token: string) => void;
  onRemove: (token: string) => void;
}) {
  const [token, setToken] = useState("");

  return (
    <div className="rounded-2xl bg-white/6 p-5">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{helper}</p>
      <div className="mt-4 flex gap-2">
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Enter token symbol, e.g. ETH"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-ink px-4 py-3 outline-none focus:border-mint/60"
        />
        <button
          onClick={() => {
            onAdd(token);
            setToken("");
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink"
        >
          <Plus size={17} /> Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tokens.length === 0 ? <p className="text-sm text-slate-500">No tokens added yet.</p> : null}
        {tokens.map((item) => (
          <button key={item} onClick={() => onRemove(item)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm">
            {item} <Trash2 size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { data, updatePolicy, addToken, removeToken, resetWorkspace } = useAppState();
  const [draft, setDraft] = useState(data.policy);

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Simple risk controls</p>
        <h1 className="mt-2 text-4xl font-black">Settings</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          These are the rules the AI must follow. Add safe tokens to whitelist, blocked tokens to blacklist, then save.
        </p>
      </div>
      <section className="surface rounded-2xl p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="rounded-2xl bg-white/6 p-4">
            <span className="text-sm text-slate-400">Automation mode</span>
            <select value={draft.mode} onChange={(event) => setDraft({ ...draft, mode: event.target.value as AutomationMode })} className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-3 py-3">
              <option value="suggest_only">Suggest only</option>
              <option value="approval_required">Ask before trading</option>
              <option value="small_auto">Auto small trades</option>
              <option value="full_auto">Full AI control within rules</option>
            </select>
          </label>
          {[
            ["takeProfitPct", "Take profit %"],
            ["stopLossPct", "Stop loss %"],
            ["maxTradeUsd", "Max trade $"],
            ["maxDailyLossPct", "Max daily loss %"],
            ["minBalanceUsd", "Minimum balance $"],
            ["nativeGasReserveUsd", "Gas reserve $"]
          ].map(([key, label]) => (
            <label key={key} className="rounded-2xl bg-white/6 p-4">
              <span className="text-sm text-slate-400">{label}</span>
              <input
                type="number"
                value={Number(draft[key as keyof typeof draft])}
                onChange={(event) => setDraft({ ...draft, [key]: Number(event.target.value) })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-3 py-3 outline-none focus:border-mint/60"
              />
            </label>
          ))}
          <label className="flex items-center justify-between rounded-2xl bg-white/6 p-4">
            <span>
              <span className="block text-sm text-slate-400">Whitelist only</span>
              <span className="text-xs text-slate-500">AI can buy only allowed tokens.</span>
            </span>
            <input type="checkbox" checked={draft.whitelistOnly} onChange={(event) => setDraft({ ...draft, whitelistOnly: event.target.checked })} className="h-5 w-5" />
          </label>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          <TokenEditor
            title="Whitelist"
            helper="Tokens the AI is allowed to buy."
            tokens={data.policy.whitelist}
            onAdd={(token) => addToken("whitelist", token)}
            onRemove={(token) => removeToken("whitelist", token)}
          />
          <TokenEditor
            title="Blacklist"
            helper="Tokens the AI must never buy."
            tokens={data.policy.blacklist}
            onAdd={(token) => addToken("blacklist", token)}
            onRemove={(token) => removeToken("blacklist", token)}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => updatePolicy(draft)} className="inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-3 font-bold text-ink">
            <Save size={18} /> Save settings
          </button>
          <button onClick={resetWorkspace} className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/8 px-5 py-3 font-bold">
            <RotateCcw size={18} /> Reset demo workspace
          </button>
        </div>
      </section>
    </Shell>
  );
}
