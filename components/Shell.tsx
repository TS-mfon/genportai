import Link from "next/link";
import { Activity, Bot, ClipboardCheck, Gauge, History, LayoutDashboard, Radar, Settings, Shield, Vault } from "lucide-react";
import { chains } from "@/lib/chains";
import { genlayerConfig } from "@/lib/genlayer-config";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "AI Chat", icon: Bot },
  { href: "/actions", label: "Actions", icon: Activity },
  { href: "/approvals", label: "Approvals", icon: ClipboardCheck },
  { href: "/markets", label: "Markets", icon: Radar },
  { href: "/vaults", label: "Vaults", icon: Vault },
  { href: "/strategy", label: "Strategy", icon: Gauge },
  { href: "/audit", label: "Audit", icon: History },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid-bg">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-[#080c15]/92 p-5 lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint/15 text-mint">
            <Shield size={22} />
          </span>
          <span>
            <span className="block text-xl font-black">GenPortAI</span>
            <span className="text-xs text-slate-400">AI vault command center</span>
          </span>
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Supported chains</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {Object.entries(chains).map(([key, chain]) => (
              <span key={key} className="rounded-lg bg-white/7 px-2 py-2 text-xs text-slate-300">
                {chain.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-mint/20 bg-mint/8 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint">GenLayer oracle</p>
          <p className="mt-2 break-all text-xs text-slate-300">{genlayerConfig.contractAddress}</p>
          <a href={genlayerConfig.explorer} target="_blank" className="mt-3 inline-block text-xs font-bold text-cyan">Open explorer</a>
        </div>
      </aside>
      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#080c15]/80 px-5 py-4 backdrop-blur lg:px-8">
          <Link href="/" className="font-black lg:hidden">GenPortAI</Link>
          <div className="hidden text-sm text-slate-400 lg:block">Hourly AI scan active. Next GenLayer batch in 21m.</div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs text-mint">Gas guarded</span>
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-cyan">5 chains</span>
          </div>
        </header>
        <div className="p-5 lg:p-8">{children}</div>
      </section>
    </main>
  );
}
