import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/initial-state";

export async function GET() {
  return NextResponse.json(dashboardData);
}
