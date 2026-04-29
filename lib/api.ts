import { dashboardData } from "./mock-data";
import type { AgentAction, ChatMessage, DashboardData, MarketEvent, Suggestion } from "./types";

export async function getDashboardData(): Promise<DashboardData> {
  return dashboardData;
}

export async function getSuggestions(): Promise<Suggestion[]> {
  return dashboardData.suggestions;
}

export async function getAgentActions(): Promise<AgentAction[]> {
  return dashboardData.actions;
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  return dashboardData.chat;
}

export async function getMarketEvents(): Promise<MarketEvent[]> {
  return dashboardData.marketEvents;
}
