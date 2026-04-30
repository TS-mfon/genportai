"use client";

import { AlertTriangle, Copy, ExternalLink, Plus, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";
import { chainName, chains } from "@/lib/chains";
import { supportedChains } from "@/lib/chain-config";

export default function VaultsPage() {
  const { data, connectWallet } = useAppState();

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Deposit funds first</p>
        <h1 className="mt-2 text-4xl font-black">Vaults</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Connect a wallet first. Until EVM vault factories are deployed on mainnet, the real deposit address is your connected EVM wallet address.
        </p>
      </div>

      <section className="mb-6 surface rounded-2xl p-5">
        <h2 className="text-xl font-black">Supported chains and RPCs</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {supportedChains.map((chain) => (
            <div key={chain.key} className="rounded-xl bg-white/6 p-4">
              <p className="font-bold">{chain.name}</p>
              <p className="mt-1 text-xs text-slate-400">Chain ID {chain.chainId}</p>
              <p className="mt-1 text-xs text-slate-400">Gas: {chain.nativeSymbol}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {data.vaults.map((vault) => (
          <article key={vault.chain} className="surface rounded-2xl p-5">
            {(() => {
              const depositAddress = vault.address || data.user.walletAddress;
              const hasAddress = Boolean(depositAddress);
              return (
                <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{chainName(vault.chain)}</h2>
                <p className="mt-1 break-all text-sm text-slate-400">
                  {hasAddress ? depositAddress : "No address yet. Connect wallet to generate a deposit address."}
                </p>
              </div>
              <button
                onClick={() => {
                  if (!depositAddress) {
                    toast.error("Connect wallet first");
                    return;
                  }
                  navigator.clipboard.writeText(depositAddress);
                  toast.success("Deposit address copied");
                }}
                className="rounded-xl bg-white/8 p-3"
                aria-label="Copy deposit address"
              >
                <Copy size={17} />
              </button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/6 p-3"><p className="text-xs text-slate-500">Value</p><p className="font-bold">${vault.totalUsd.toLocaleString()}</p></div>
              <div className="rounded-xl bg-white/6 p-3"><p className="text-xs text-slate-500">Gas</p><p className="font-bold">{vault.nativeBalance} {vault.nativeSymbol}</p></div>
              <div className="rounded-xl bg-white/6 p-3"><p className="text-xs text-slate-500">Status</p><p className={vault.gasReady ? "font-bold text-mint" : "font-bold text-coral"}>{vault.gasReady ? "Ready" : "Low gas"}</p></div>
            </div>
            {!vault.gasReady ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-coral/30 bg-coral/10 p-3 text-sm text-coral">
                <AlertTriangle size={16} /> Add {chains[vault.chain].nativeSymbol} before enabling AI trades.
              </p>
            ) : null}
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <button
                onClick={() => {
                  if (!depositAddress) {
                    connectWallet();
                    return;
                  }
                  navigator.clipboard.writeText(depositAddress);
                  toast.success(`Deposit address copied for ${chainName(vault.chain)}`);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink"
              >
                <Plus size={17} /> {hasAddress ? "Copy deposit address" : "Connect wallet"}
              </button>
              <button
                onClick={() => toast.info("Withdrawals require a funded vault and wallet signature. No funds detected yet.")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/8 px-4 py-3 font-bold"
              >
                <Wallet size={17} /> Withdraw
              </button>
              <a href={chains[vault.chain].explorer} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 font-bold text-cyan">
                <ExternalLink size={17} /> Explorer
              </a>
            </div>
                </>
              );
            })()}
          </article>
        ))}
      </div>
    </Shell>
  );
}
