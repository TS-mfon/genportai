"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { dashboardData } from "./initial-state";
import type { AgentAction, ChatMessage, DashboardData, SuggestionStatus, UserPolicy } from "./types";

type AppStateContextValue = {
  data: DashboardData;
  signInWithEmail: (email: string) => void;
  connectWallet: () => Promise<void>;
  completeOnboarding: () => void;
  approveSuggestion: (id: string) => void;
  rejectSuggestion: (id: string) => void;
  executeSuggestion: (id: string) => void;
  addToken: (list: "whitelist" | "blacklist", token: string) => void;
  removeToken: (list: "whitelist" | "blacklist", token: string) => void;
  updatePolicy: (patch: Partial<UserPolicy>) => void;
  sendChatMessage: (content: string) => Promise<void>;
  resetWorkspace: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);
const storageKey = "genportai:v2";

function createAction(input: Omit<AgentAction, "id" | "createdAt">): AgentAction {
  return {
    ...input,
    id: `act_${Date.now()}`,
    createdAt: new Date().toISOString()
  };
}

function updateSuggestionStatus(data: DashboardData, id: string, status: SuggestionStatus): DashboardData {
  return {
    ...data,
    suggestions: data.suggestions.map((suggestion) =>
      suggestion.id === id ? { ...suggestion, status } : suggestion
    )
  };
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(dashboardData);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return;
    try {
      setData(JSON.parse(stored) as DashboardData);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  const value = useMemo<AppStateContextValue>(() => ({
    data,
    signInWithEmail: (email) => {
      const normalized = email.trim().toLowerCase();
      if (!normalized || !normalized.includes("@")) {
        toast.error("Enter a valid email");
        return;
      }
      setData((current) => ({
        ...current,
        user: { ...current.user, email: normalized, signedIn: true }
      }));
      toast.success("Email signed in");
    },
    connectWallet: async () => {
      const ethereum = (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum;
      if (!ethereum) {
        toast.error("No wallet found. Install MetaMask or open in a wallet browser.");
        return;
      }
      try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0] || "";
        setData((current) => ({
          ...current,
          user: { ...current.user, walletAddress: address, signedIn: true }
        }));
        toast.success("Wallet connected");
      } catch {
        toast.error("Wallet connection rejected");
      }
    },
    completeOnboarding: () => {
      setData((current) => ({
        ...current,
        user: { ...current.user, onboardingComplete: true }
      }));
      toast.success("Onboarding saved");
    },
    approveSuggestion: (id) => {
      const suggestion = data.suggestions.find((item) => item.id === id);
      if (!suggestion) return;
      setData((current) => ({
        ...updateSuggestionStatus(current, id, "approved"),
        actions: [
          createAction({
            title: `Approved ${suggestion.action.replace("_", " ")} ${suggestion.token}`,
            status: "approved",
            chain: suggestion.chain,
            token: suggestion.token,
            amountUsd: suggestion.amountUsd,
            risk: suggestion.risk,
            source: "user",
            summary: "User approved the AI suggestion. Execution worker can now simulate and submit the vault transaction."
          }),
          ...current.actions
        ]
      }));
      toast.success("Suggestion approved");
    },
    rejectSuggestion: (id) => {
      const suggestion = data.suggestions.find((item) => item.id === id);
      if (!suggestion) return;
      setData((current) => ({
        ...updateSuggestionStatus(current, id, "rejected"),
        actions: [
          createAction({
            title: `Rejected ${suggestion.action.replace("_", " ")} ${suggestion.token}`,
            status: "rejected",
            chain: suggestion.chain,
            token: suggestion.token,
            amountUsd: suggestion.amountUsd,
            risk: suggestion.risk,
            source: "user",
            summary: "User rejected the AI suggestion. The decision remains visible in action history and audit logs."
          }),
          ...current.actions
        ]
      }));
      toast.info("Suggestion rejected");
    },
    executeSuggestion: (id) => {
      const suggestion = data.suggestions.find((item) => item.id === id);
      if (!suggestion) return;
      setData((current) => ({
        ...updateSuggestionStatus(current, id, "executed"),
        actions: [
          createAction({
            title: `Executed ${suggestion.action.replace("_", " ")} ${suggestion.token}`,
            status: "executed",
            chain: suggestion.chain,
            token: suggestion.token,
            amountUsd: suggestion.amountUsd,
            risk: suggestion.risk,
            source: "user",
            summary: "Execution simulated as complete. Production will submit this through the per-chain vault executor."
          }),
          ...current.actions
        ]
      }));
      toast.success("Action executed in workspace state");
    },
    addToken: (list, token) => {
      const normalized = token.trim().toUpperCase();
      if (!normalized) return;
      setData((current) => {
        const existing = current.policy[list];
        if (existing.includes(normalized)) return current;
        return {
          ...current,
          policy: { ...current.policy, [list]: [...existing, normalized] }
        };
      });
      toast.success(`${normalized} added to ${list}`);
    },
    removeToken: (list, token) => {
      setData((current) => ({
        ...current,
        policy: {
          ...current.policy,
          [list]: current.policy[list].filter((item) => item !== token)
        }
      }));
      toast.info(`${token} removed`);
    },
    updatePolicy: (patch) => {
      setData((current) => ({
        ...current,
        policy: { ...current.policy, ...patch }
      }));
      toast.success("Settings saved");
    },
    sendChatMessage: async (content) => {
      const trimmed = content.trim();
      if (!trimmed) return;
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_u`,
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString()
      };
      setData((current) => ({
        ...current,
        chat: [...current.chat, userMessage]
      }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            policy: data.policy,
            walletAddress: data.user.walletAddress,
            email: data.user.email
          })
        });
        const result = await response.json();
        const assistantMessage: ChatMessage = {
          id: `msg_${Date.now()}_a`,
          role: "assistant",
          content: result.reply || "GenLayer returned no answer.",
          createdAt: new Date().toISOString()
        };
        setData((current) => ({
          ...current,
          chat: [...current.chat, assistantMessage],
          suggestions: Array.isArray(result.suggestions) && result.suggestions.length > 0
            ? [...result.suggestions, ...current.suggestions]
            : current.suggestions,
          actions: result.action
            ? [createAction(result.action), ...current.actions]
            : current.actions
        }));
        if (!response.ok) toast.error(result.reply || "GenLayer chat failed");
      } catch {
        const assistantMessage: ChatMessage = {
          id: `msg_${Date.now()}_a`,
          role: "assistant",
          content: "GenLayer is unreachable right now. I did not create a trade proposal.",
          createdAt: new Date().toISOString()
        };
        setData((current) => ({ ...current, chat: [...current.chat, assistantMessage] }));
        toast.error("GenLayer unreachable");
      }
    },
    resetWorkspace: () => {
      setData(dashboardData);
      window.localStorage.removeItem("genportai:v1");
      window.localStorage.removeItem(storageKey);
      toast.info("Workspace reset");
    }
  }), [data]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used inside AppStateProvider");
  return context;
}
