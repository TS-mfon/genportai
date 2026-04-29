export const genlayerConfig = {
  network: process.env.NEXT_PUBLIC_GENLAYER_NETWORK || "studionet",
  contractAddress:
    process.env.NEXT_PUBLIC_GENLAYER_CONTRACT_ADDRESS || "0xB9739D1D3C3b50235Ae8D0436E8F73062E2e17c1",
  explorer: process.env.NEXT_PUBLIC_GENLAYER_EXPLORER || "https://genlayer-explorer.vercel.app"
};
