import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabase = createServer();
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const storename = data.search;
  const houlyRate = data.values.houlyRate;
  const position = data.values.position;

  const { data: storeData, error: storeError } = await supabaseAdmin
    .from("stores")
    .select("id")
    .eq("storename", storename)
    .single();
  if (storeError) {
    return NextResponse.error();
  }

  const { error: memberInfoError } = await supabaseAdmin
    .from("store_members")
    .update({
      hourly_rate: houlyRate,
      position: position,
    })
    .eq("store_id", storeData.id)
    .eq("user_id", user.id);
  if (memberInfoError) {
    return NextResponse.error();
  }

  return NextResponse.json("success");
}
