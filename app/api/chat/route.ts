import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(dashboardData.chat);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    id: `msg_${Date.now()}`,
    role: "assistant",
    content: `I received: ${body.message ?? "your request"}. In production this fast chat path stores history in Postgres and calls GenLayer only when a high-trust portfolio decision is needed.`,
    createdAt: new Date().toISOString()
  });
}
