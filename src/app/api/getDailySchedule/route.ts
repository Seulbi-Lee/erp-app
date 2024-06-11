import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getDailySchedule } from ".";

export async function POST(req: NextRequest) {
  // get date data from CalendarComponent
  const calendarData = await req.json();

  return NextResponse.json(await getDailySchedule(calendarData));
}
