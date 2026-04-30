export type ChainKey = "ethereum" | "base" | "optimism" | "arbitrum" | "bnb";

export type SuggestionAction =
  | "buy"
  | "sell"
  | "hold"
  | "rebalance"
  | "take_profit"
  | "stop_loss"
  | "watch";

export type SuggestionStatus = "new" | "needs_approval" | "approved" | "executed" | "rejected" | "expired";

export type AutomationMode = "suggest_only" | "approval_required" | "small_auto" | "full_auto";

export type AgentActionStatus = "suggested" | "waiting" | "approved" | "executed" | "failed" | "rejected";

export type PortfolioPoint = {
  date: string;
  value: number;
  pnl: number;
};

export type Holding = {
  symbol: string;
  name: string;
  chain: ChainKey;
  valueUsd: number;
  amount: number;
  allocation: number;
  pnl24h: number;
  risk: number;
};

export type Suggestion = {
  id: string;
  token: string;
  name: string;
  chain: ChainKey;
  action: SuggestionAction;
  status: SuggestionStatus;
  confidence: number;
  risk: number;
  amountUsd: number;
  trigger: string;
  reason: string;
  takeProfitPct: number;
  stopLossPct: number;
  expiresAt: string;
};

export type AgentAction = {
  id: string;
  title: string;
  status: AgentActionStatus;
  chain: ChainKey;
  token: string;
  amountUsd: number;
  risk: number;
  createdAt: string;
  source: "hourly_market_scan" | "trending_event" | "chat" | "risk_guardian" | "user";
  summary: string;
  txHash?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  linkedActionId?: string;
};

export type MarketEvent = {
  id: string;
  label: string;
  token: string;
  chain: ChainKey;
  movePct: number;
  volumeUsd: number;
  risk: number;
  detectedAt: string;
};

export type Vault = {
  chain: ChainKey;
  address: string;
  nativeSymbol: string;
  nativeBalance: number;
  gasReady: boolean;
  totalUsd: number;
};

export type UserPolicy = {
  mode: AutomationMode;
  takeProfitPct: number;
  stopLossPct: number;
  maxTradeUsd: number;
  maxDailyLossPct: number;
  minBalanceUsd: number;
  nativeGasReserveUsd: number;
  whitelistOnly: boolean;
  whitelist: string[];
  blacklist: string[];
};

export type DashboardData = {
  user: {
    email: string;
    walletAddress: string;
    signedIn: boolean;
    onboardingComplete: boolean;
  };
  portfolioValueUsd: number;
  roiPct: number;
  pnlUsd: number;
  aiScore: number;
  gasHealth: number;
  riskScore: number;
  policy: UserPolicy;
  holdings: Holding[];
  portfolioHistory: PortfolioPoint[];
  suggestions: Suggestion[];
  actions: AgentAction[];
  chat: ChatMessage[];
  marketEvents: MarketEvent[];
  vaults: Vault[];
};
