"use client";

import { Check, Play, X } from "lucide-react";
import { Shell } from "@/components/Shell";
import { SuggestionCard } from "@/components/SuggestionCard";
import { useAppState } from "@/lib/app-state";

export default function ApprovalsPage() {
  const { data, approveSuggestion, rejectSuggestion, executeSuggestion } = useAppState();
  const pending = data.suggestions.filter((suggestion) => suggestion.status === "needs_approval" || suggestion.status === "approved");

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Human checkpoint</p>
        <h1 className="mt-2 text-4xl font-black">Approvals</h1>
        <p className="mt-3 text-slate-400">Nothing trades unless it fits your selected mode and rules.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {pending.map((suggestion) => (
          <div key={suggestion.id}>
            <SuggestionCard suggestion={suggestion} />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <button onClick={() => approveSuggestion(suggestion.id)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink">
                <Check size={18} /> Approve
              </button>
              <button onClick={() => rejectSuggestion(suggestion.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 font-bold text-coral">
                <X size={18} /> Reject
              </button>
              <button onClick={() => executeSuggestion(suggestion.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 font-bold text-cyan">
                <Play size={18} /> Execute
              </button>
            </div>
          </div>
        ))}
      </div>
      {pending.length === 0 ? <p className="surface rounded-2xl p-6 text-slate-300">No pending approvals. New AI suggestions appear here after each hourly scan.</p> : null}
    </Shell>
  );
}
