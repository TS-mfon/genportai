import { workerPipelines } from "./architecture";

export type WorkerJob = {
  queue: string;
  schedule: string;
  purpose: string;
};

export const workerJobs: WorkerJob[] = [
  {
    queue: "cryptorank-hourly-scan",
    schedule: "0 * * * *",
    purpose: "Fetch and normalize CryptoRank market data, then create a market snapshot hash."
  },
  {
    queue: "cryptorank-trending-detector",
    schedule: "*/5 * * * *",
    purpose: "Detect top gainers, volume spikes, sharp drawdowns, unlock risk, and narrative moves."
  },
  {
    queue: "genlayer-segment-suggestions",
    schedule: "after market snapshot",
    purpose: "Call GenLayer per user segment and request exactly 5 suggestions."
  },
  {
    queue: "suggestion-personalizer",
    schedule: "after GenLayer batch",
    purpose: "Apply balances, gas reserve, whitelist, blacklist, and user limits to segment suggestions."
  },
  {
    queue: "email-notification-dispatch",
    schedule: "event driven",
    purpose: "Email users when suggestions, approvals, executions, failures, gas warnings, or reports occur."
  },
  {
    queue: "evm-vault-indexer",
    schedule: "continuous",
    purpose: "Index deposits, withdrawals, executions, and vault pause events across all supported chains."
  },
  {
    queue: "trade-execution-simulator",
    schedule: "approval or auto action",
    purpose: "Fetch DEX quote, simulate transaction, recheck policy, and submit vault execution."
  },
  {
    queue: "portfolio-pnl-snapshot",
    schedule: "*/15 * * * *",
    purpose: "Compute ROI, PNL, allocation, risk score, and dashboard cache."
  }
];

export function getWorkerPipelineNames() {
  return workerPipelines;
}
