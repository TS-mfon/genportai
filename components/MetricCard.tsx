import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "mint"
}: {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone?: "mint" | "cyan" | "amber" | "coral";
}) {
  const toneClass = {
    mint: "text-mint bg-mint/10 border-mint/20",
    cyan: "text-cyan bg-cyan/10 border-cyan/20",
    amber: "text-amber bg-amber/10 border-amber/20",
    coral: "text-coral bg-coral/10 border-coral/20"
  }[tone];

  return (
    <article className="surface rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
        </div>
        <span className={`rounded-xl border p-3 ${toneClass}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-300">{change}</p>
    </article>
  );
}
