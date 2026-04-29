import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AppStateProvider } from "@/lib/app-state";
import "./globals.css";

export const metadata: Metadata = {
  title: "GenPortAI",
  description: "AI portfolio manager powered by GenLayer decisions and multi-chain smart vaults."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>{children}</AppStateProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
