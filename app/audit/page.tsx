"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { ActionTimeline } from "@/components/ActionTimeline";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";

export default function AuditPage() {
  const { data } = useAppState();
  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-mint">Append-only logs</p>
          <h1 className="mt-2 text-4xl font-black">Audit log</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Important GenLayer decision objects and EVM receipts are hash-linked for integrity.</p>
        </div>
        <button onClick={() => toast.success("CSV export queued")} className="inline-flex items-center gap-2 rounded-xl bg-white/8 px-4 py-3 font-bold">
          <Download size={17} /> Export CSV
        </button>
      </div>
      <ActionTimeline actions={data.actions} />
    </Shell>
  );
}
