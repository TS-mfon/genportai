import type { DashboardData } from "./types";

export const dashboardData: DashboardData = {
  portfolioValueUsd: 128430.72,
  roiPct: 18.7,
  pnlUsd: 20284.18,
  aiScore: 84,
  gasHealth: 78,
  riskScore: 42,
  policy: {
    mode: "small_auto",
    takeProfitPct: 18,
    stopLossPct: 7,
    maxTradeUsd: 2500,
    maxDailyLossPct: 3,
    minBalanceUsd: 15000,
    nativeGasReserveUsd: 50,
    whitelistOnly: false,
    whitelist: ["ETH", "BTC", "SOL", "LINK", "AERO"],
    blacklist: ["HONEYPOT", "LOWLIQ"]
  },
  holdings: [
    { symbol: "ETH", name: "Ethereum", chain: "ethereum", valueUsd: 42800, amount: 12.3, allocation: 33, pnl24h: 2.4, risk: 24 },
    { symbol: "AERO", name: "Aerodrome", chain: "base", valueUsd: 18400, amount: 22100, allocation: 14, pnl24h: 8.9, risk: 58 },
    { symbol: "OP", name: "Optimism", chain: "optimism", valueUsd: 13220, amount: 8700, allocation: 10, pnl24h: -1.2, risk: 44 },
    { symbol: "ARB", name: "Arbitrum", chain: "arbitrum", valueUsd: 11840, amount: 19220, allocation: 9, pnl24h: 1.7, risk: 39 },
    { symbol: "BNB", name: "BNB", chain: "bnb", valueUsd: 22100, amount: 31.1, allocation: 17, pnl24h: 0.8, risk: 31 },
    { symbol: "USDC", name: "USD Coin", chain: "base", valueUsd: 20070, amount: 20070, allocation: 17, pnl24h: 0, risk: 8 }
  ],
  portfolioHistory: [
    { date: "Apr 23", value: 106200, pnl: 2800 },
    { date: "Apr 24", value: 111900, pnl: 8500 },
    { date: "Apr 25", value: 109700, pnl: 6300 },
    { date: "Apr 26", value: 118300, pnl: 14900 },
    { date: "Apr 27", value: 121100, pnl: 17700 },
    { date: "Apr 28", value: 124800, pnl: 21400 },
    { date: "Apr 29", value: 128430, pnl: 20284 }
  ],
  suggestions: [
    {
      id: "sug_001",
      token: "AERO",
      name: "Aerodrome",
      chain: "base",
      action: "take_profit",
      status: "needs_approval",
      confidence: 86,
      risk: 52,
      amountUsd: 2200,
      trigger: "Volume spike and RSI extension",
      reason: "CryptoRank trend data shows strong short-term momentum, but your position is above target allocation. Locking partial profit keeps upside while reducing concentration.",
      takeProfitPct: 22,
      stopLossPct: 8,
      expiresAt: "2026-04-29T18:00:00Z"
    },
    {
      id: "sug_002",
      token: "LINK",
      name: "Chainlink",
      chain: "ethereum",
      action: "buy",
      status: "new",
      confidence: 78,
      risk: 35,
      amountUsd: 1500,
      trigger: "Large-cap DeFi rotation",
      reason: "Market breadth improved while LINK volatility stayed below your configured max risk. Suggested entry is below max trade size and preserves gas reserve.",
      takeProfitPct: 16,
      stopLossPct: 6,
      expiresAt: "2026-04-29T18:00:00Z"
    },
    {
      id: "sug_003",
      token: "USDC",
      name: "USD Coin",
      chain: "base",
      action: "rebalance",
      status: "new",
      confidence: 81,
      risk: 12,
      amountUsd: 3200,
      trigger: "Portfolio risk above target",
      reason: "The AI score is healthy, but risk exposure rose after Base ecosystem gains. Increasing reserves improves optionality for the next market event.",
      takeProfitPct: 0,
      stopLossPct: 0,
      expiresAt: "2026-04-29T18:00:00Z"
    },
    {
      id: "sug_004",
      token: "ARB",
      name: "Arbitrum",
      chain: "arbitrum",
      action: "hold",
      status: "new",
      confidence: 73,
      risk: 39,
      amountUsd: 0,
      trigger: "No edge after gas and slippage",
      reason: "ARB is aligned with your portfolio, but the AI did not find enough edge to justify a trade after execution costs.",
      takeProfitPct: 14,
      stopLossPct: 7,
      expiresAt: "2026-04-29T18:00:00Z"
    },
    {
      id: "sug_005",
      token: "BNB",
      name: "BNB",
      chain: "bnb",
      action: "watch",
      status: "new",
      confidence: 69,
      risk: 33,
      amountUsd: 0,
      trigger: "Trend forming, confirmation missing",
      reason: "BNB liquidity is strong, but momentum confirmation is not complete. Add to opportunity inbox and wait for the next hourly scan.",
      takeProfitPct: 12,
      stopLossPct: 5,
      expiresAt: "2026-04-29T18:00:00Z"
    }
  ],
  actions: [
    {
      id: "act_100",
      title: "Generated 5 hourly suggestions",
      status: "suggested",
      chain: "base",
      token: "AERO",
      amountUsd: 0,
      risk: 42,
      createdAt: "2026-04-29T15:00:00Z",
      source: "hourly_market_scan",
      summary: "GenLayer analyzed the Base/ETH/OP/ARB/BNB segment and returned five ranked suggestions."
    },
    {
      id: "act_101",
      title: "Partial AERO take-profit pending",
      status: "waiting",
      chain: "base",
      token: "AERO",
      amountUsd: 2200,
      risk: 52,
      createdAt: "2026-04-29T15:02:11Z",
      source: "trending_event",
      summary: "Requires approval because the trade is above your small auto-trade threshold."
    },
    {
      id: "act_099",
      title: "Rebalanced into USDC reserve",
      status: "executed",
      chain: "base",
      token: "USDC",
      amountUsd: 1800,
      risk: 18,
      createdAt: "2026-04-29T12:17:43Z",
      source: "risk_guardian",
      summary: "Risk Guardian executed within your auto limits after portfolio volatility rose.",
      txHash: "0x9f3b2a4c1d2e7f8a00112233445566778899aabbccddeeff0011223344556677"
    }
  ],
  chat: [
    {
      id: "msg_1",
      role: "assistant",
      content: "I scanned your vaults and market profile. Your portfolio score is 84/100; concentration risk is the main thing to watch today.",
      createdAt: "2026-04-29T14:59:02Z"
    },
    {
      id: "msg_2",
      role: "user",
      content: "Should I reduce my Base exposure?",
      createdAt: "2026-04-29T15:01:10Z"
    },
    {
      id: "msg_3",
      role: "assistant",
      content: "Yes, but only partially. I opened an AERO take-profit action for approval because it is larger than your auto-trade cap.",
      createdAt: "2026-04-29T15:02:11Z",
      linkedActionId: "act_101"
    }
  ],
  marketEvents: [
    { id: "evt_1", label: "Base DeFi rotation", token: "AERO", chain: "base", movePct: 12.4, volumeUsd: 82000000, risk: 58, detectedAt: "2026-04-29T14:48:00Z" },
    { id: "evt_2", label: "Large-cap oracle bid", token: "LINK", chain: "ethereum", movePct: 5.8, volumeUsd: 214000000, risk: 35, detectedAt: "2026-04-29T14:51:00Z" },
    { id: "evt_3", label: "L2 volatility cooling", token: "ARB", chain: "arbitrum", movePct: 1.9, volumeUsd: 67000000, risk: 39, detectedAt: "2026-04-29T14:57:00Z" }
  ],
  vaults: [
    { chain: "ethereum", address: "0x4E1f...9a20", nativeSymbol: "ETH", nativeBalance: 0.21, gasReady: true, totalUsd: 44300 },
    { chain: "base", address: "0xB45e...7Dc1", nativeSymbol: "ETH", nativeBalance: 0.036, gasReady: true, totalUsd: 58470 },
    { chain: "optimism", address: "0x0P71...1A9f", nativeSymbol: "ETH", nativeBalance: 0.009, gasReady: false, totalUsd: 13220 },
    { chain: "arbitrum", address: "0xA4B1...bb80", nativeSymbol: "ETH", nativeBalance: 0.028, gasReady: true, totalUsd: 11840 },
    { chain: "bnb", address: "0xbNb5...20Ef", nativeSymbol: "BNB", nativeBalance: 0.42, gasReady: true, totalUsd: 22100 }
  ]
};
