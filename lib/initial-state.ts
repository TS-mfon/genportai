import { supportedChains } from "./chain-config";
import type { DashboardData } from "./types";

export const dashboardData: DashboardData = {
  user: {
    email: "",
    walletAddress: "",
    signedIn: false,
    onboardingComplete: false
  },
  portfolioValueUsd: 0,
  roiPct: 0,
  pnlUsd: 0,
  aiScore: 0,
  gasHealth: 0,
  riskScore: 0,
  policy: {
    mode: "approval_required",
    takeProfitPct: 15,
    stopLossPct: 6,
    maxTradeUsd: 0,
    maxDailyLossPct: 3,
    minBalanceUsd: 0,
    nativeGasReserveUsd: 25,
    whitelistOnly: false,
    whitelist: [],
    blacklist: []
  },
  holdings: [],
  portfolioHistory: [],
  suggestions: [],
  actions: [],
  chat: [],
  marketEvents: [],
  vaults: supportedChains.map((chain) => ({
    chain: chain.key,
    address: "",
    nativeSymbol: chain.nativeSymbol,
    nativeBalance: 0,
    gasReady: false,
    totalUsd: 0
  }))
};
