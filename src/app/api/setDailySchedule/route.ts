import { createAdmin } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabaseAdmin = createAdmin();

  console.log(data);

  const { error: insertError } = await supabaseAdmin.from("schedules").insert({
    store_id: data.store_id,
    user_id: data.memberId,
    date: data.date,
    start: data.startTime,
    end: data.endTime,
  });

  if (insertError) {
    return NextResponse.error();
  }

  return NextResponse.json("success");
}
