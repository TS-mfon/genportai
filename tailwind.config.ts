import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A12",
        panel: "#101521",
        line: "#263041",
        mint: "#3EF7B4",
        cyan: "#48D8FF",
        amber: "#FFCA5F",
        coral: "#FF6B6B"
      },
      boxShadow: {
        glow: "0 0 42px rgba(62, 247, 180, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
