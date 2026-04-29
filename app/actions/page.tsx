"use client";

import { useState } from "react";
import { ActionTimeline } from "@/components/ActionTimeline";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";

export default function ActionsPage() {
  const { data } = useAppState();
  const [query, setQuery] = useState("");
  const actions = data.actions.filter((action) =>
    `${action.title} ${action.summary} ${action.token} ${action.status}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Agent replay</p>
        <h1 className="mt-2 text-4xl font-black">Action history</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Everything the agent suggests, changes, or attempts is shown here.</p>
      </div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search actions..." className="mb-4 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none focus:border-mint/60" />
      <ActionTimeline actions={actions} />
    </Shell>
  );
}
