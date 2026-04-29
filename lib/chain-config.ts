import type { ChainKey } from "./types";

export type SupportedChainConfig = {
  key: ChainKey;
  name: string;
  chainId: number;
  nativeSymbol: string;
  rpcEnv: string;
  fallbackRpc: string;
  explorer: string;
};

export const supportedChains: SupportedChainConfig[] = [
  {
    key: "ethereum",
    name: "Ethereum",
    chainId: 1,
    nativeSymbol: "ETH",
    rpcEnv: "ETHEREUM_RPC_URL",
    fallbackRpc: "https://ethereum-rpc.publicnode.com",
    explorer: "https://etherscan.io"
  },
  {
    key: "base",
    name: "Base",
    chainId: 8453,
    nativeSymbol: "ETH",
    rpcEnv: "BASE_RPC_URL",
    fallbackRpc: "https://mainnet.base.org",
    explorer: "https://basescan.org"
  },
  {
    key: "optimism",
    name: "Optimism",
    chainId: 10,
    nativeSymbol: "ETH",
    rpcEnv: "OPTIMISM_RPC_URL",
    fallbackRpc: "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io"
  },
  {
    key: "arbitrum",
    name: "Arbitrum",
    chainId: 42161,
    nativeSymbol: "ETH",
    rpcEnv: "ARBITRUM_RPC_URL",
    fallbackRpc: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io"
  },
  {
    key: "bnb",
    name: "BNB Chain",
    chainId: 56,
    nativeSymbol: "BNB",
    rpcEnv: "BNB_RPC_URL",
    fallbackRpc: "https://bsc-dataseed.binance.org",
    explorer: "https://bscscan.com"
  }
];

export function getRpcUrl(chain: SupportedChainConfig) {
  return process.env[chain.rpcEnv] || chain.fallbackRpc;
}
