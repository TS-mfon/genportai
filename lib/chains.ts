import type { ChainKey } from "./types";

export const chains: Record<ChainKey, { name: string; nativeSymbol: string; color: string; explorer: string }> = {
  ethereum: {
    name: "Ethereum",
    nativeSymbol: "ETH",
    color: "#48D8FF",
    explorer: "https://etherscan.io"
  },
  base: {
    name: "Base",
    nativeSymbol: "ETH",
    color: "#3E7BFA",
    explorer: "https://basescan.org"
  },
  optimism: {
    name: "Optimism",
    nativeSymbol: "ETH",
    color: "#FF6B6B",
    explorer: "https://optimistic.etherscan.io"
  },
  arbitrum: {
    name: "Arbitrum",
    nativeSymbol: "ETH",
    color: "#7AA2FF",
    explorer: "https://arbiscan.io"
  },
  bnb: {
    name: "BNB Chain",
    nativeSymbol: "BNB",
    color: "#FFCA5F",
    explorer: "https://bscscan.com"
  }
};

export function chainName(chain: ChainKey) {
  return chains[chain].name;
}
