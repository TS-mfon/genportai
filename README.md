# GenPortAI

GenPortAI is a multi-chain AI portfolio manager scaffold built around a fast web/backend layer and a small GenLayer decision oracle.

## What is implemented

- Modern Next.js app shell with dashboard, AI chat history, agent action history, approvals, vaults, markets, strategy builder, settings, onboarding, and audit log.
- Mock API routes for dashboard, chat, actions, and market events.
- Typed domain model for portfolio data, suggestions, user policies, vaults, chat messages, and agent actions.
- GenLayer intelligent contract that generates exactly 5 AI suggestions per segment and validates high-value actions.
- EVM vault contracts for per-user custody and executor-limited approved actions.
- Worker and database schema stubs for scaling thousands of users.

## Architecture

GenLayer is intentionally kept small because contract calls can take 30+ seconds. The backend stores chat history, action history, approvals, audit logs, portfolio data, and notifications. Workers call GenLayer hourly and on trending CryptoRank activity, grouped by user segment instead of once per user.

## Run frontend

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
genvm-lint check contracts/genport_ai_decision_oracle.py
pytest tests/direct/ -v
forge test --manifest-path evm/foundry.toml
```

## Production integration points

- Replace mock data in `lib/mock-data.ts` with Postgres queries.
- Wire CryptoRank in hourly and trending workers.
- Add Redis/BullMQ queues using `lib/workers.ts`.
- Add email provider for suggestion/action notifications.
- Add DEX aggregator adapters to the execution service.
- Deploy EVM vault contracts per chain.
- Deploy GenLayer decision oracle on the target GenLayer environment.

## Deployed GenLayer oracle

- Network: Studionet
- Contract: `0xB9739D1D3C3b50235Ae8D0436E8F73062E2e17c1`
- Deploy tx: `0x0096d53eb8be6811d623c2659e67f10b19e9a3054bbb17b5adf7ef2cd25a5470`
