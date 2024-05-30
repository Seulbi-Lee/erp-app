import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getDailySchedule } from ".";

export async function POST(req: NextRequest) {
  return NextResponse.json(await getDailySchedule());
}
