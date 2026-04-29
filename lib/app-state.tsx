"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { dashboardData } from "./mock-data";
import type { AgentAction, ChatMessage, DashboardData, SuggestionStatus, UserPolicy } from "./types";

type AppStateContextValue = {
  data: DashboardData;
  approveSuggestion: (id: string) => void;
  rejectSuggestion: (id: string) => void;
  executeSuggestion: (id: string) => void;
  addToken: (list: "whitelist" | "blacklist", token: string) => void;
  removeToken: (list: "whitelist" | "blacklist", token: string) => void;
  updatePolicy: (patch: Partial<UserPolicy>) => void;
  sendChatMessage: (content: string) => void;
  addAction: (action: Omit<AgentAction, "id" | "createdAt">) => void;
  resetWorkspace: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);
const storageKey = "genportai:v1";

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
          policy: { ...current.policy, [list]: [...existing, normalized] },
          actions: [
            createAction({
              title: `Added ${normalized} to ${list}`,
              status: "executed",
              chain: "base",
              token: normalized,
              amountUsd: 0,
              risk: list === "blacklist" ? 5 : 20,
              source: "user",
              summary: `Policy updated. ${normalized} is now in the ${list}.`
            }),
            ...current.actions
          ]
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
        },
        actions: [
          createAction({
            title: `Removed ${token} from ${list}`,
            status: "executed",
            chain: "base",
            token,
            amountUsd: 0,
            risk: 12,
            source: "user",
            summary: `Policy updated. ${token} was removed from the ${list}.`
          }),
          ...current.actions
        ]
      }));
      toast.info(`${token} removed`);
    },
    updatePolicy: (patch) => {
      setData((current) => ({
        ...current,
        policy: { ...current.policy, ...patch },
        actions: [
          createAction({
            title: "Updated trading policy",
            status: "executed",
            chain: "base",
            token: "POLICY",
            amountUsd: 0,
            risk: 18,
            source: "user",
            summary: "Risk settings changed and will be included in the next policy hash."
          }),
          ...current.actions
        ]
      }));
      toast.success("Settings saved");
    },
    sendChatMessage: (content) => {
      const trimmed = content.trim();
      if (!trimmed) return;
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_u`,
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString()
      };
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_a`,
        role: "assistant",
        content: "I saved this chat to your history. For trade-impacting requests, I will create a suggestion or approval item instead of silently executing.",
        createdAt: new Date().toISOString()
      };
      setData((current) => ({
        ...current,
        chat: [...current.chat, userMessage, assistantMessage],
        actions: [
          createAction({
            title: "Chat message processed",
            status: "suggested",
            chain: "base",
            token: "CHAT",
            amountUsd: 0,
            risk: 10,
            source: "chat",
            summary: trimmed
          }),
          ...current.actions
        ]
      }));
      toast.success("Chat saved");
    },
    addAction: (action) => {
      setData((current) => ({
        ...current,
        actions: [createAction(action), ...current.actions]
      }));
      toast.success("Action recorded");
    },
    resetWorkspace: () => {
      setData(dashboardData);
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
