import { createAdmin } from "@/utils/supabase/admin";
import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const supabaseAdmin = createAdmin();
  const userId = data.memberId;

  const { data: userData, error: userError } = await supabaseAdmin
    .from("store_members")
    .select("hourly_rate")
    .eq("user_id", userId)
    .eq("store_id", data.storeId)
    .single();

  if (userError) {
    return NextResponse.json(userError, { status: 400 });
  }

  const startDateTime = DateTime.fromISO(data.startTime);
  const endDateTime = DateTime.fromISO(data.endTime);

  const workMin = endDateTime.diff(startDateTime, "minute").minutes;
  const payPerMin = userData.hourly_rate ? userData.hourly_rate / 60 : null;
  const amounts = payPerMin ? (workMin * payPerMin).toFixed(2) : null;

  const { error: insertError } = await supabaseAdmin.from("schedules").insert({
    store_id: data.storeId,
    user_id: data.memberId,
    date: data.date,
    start: data.startTime,
    end: data.endTime,
    amounts: amounts,
  });

  if (insertError) {
    console.log(insertError);
    return NextResponse.json(insertError, { status: 400 });
  }

  return NextResponse.json("success");
}
