export const architectureNotes = [
  "Backend stores chat history, action history, approvals, email state, portfolios, and audit logs.",
  "GenLayer only generates/validates high-value AI decisions and records compact hashes.",
  "Hourly and trending workers call GenLayer per user segment instead of per user.",
  "Execution workers recheck policy, gas reserve, DEX quotes, and simulations before any vault trade.",
  "Email jobs notify users when suggestions, approvals, executions, failures, gas warnings, and reports occur."
];

export const workerPipelines = [
  "cryptorank-hourly-scan",
  "cryptorank-trending-detector",
  "genlayer-segment-suggestions",
  "suggestion-personalizer",
  "email-notification-dispatch",
  "evm-vault-indexer",
  "trade-execution-simulator",
  "portfolio-pnl-snapshot"
];
