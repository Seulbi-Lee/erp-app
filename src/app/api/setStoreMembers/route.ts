import "server-only";
import { createAdmin } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { createServer } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabase = createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const supabaseAdmin = createAdmin();

  if(!user) return;

  const { data: storeData, error: storeError } = await supabaseAdmin
    .from("stores")
    .select("id, password")
    .eq("storename", data.storename)
    .single();

  if (storeError || storeData.password !== data.password) {
    return NextResponse.json("Wrong store name or password");
  }

  const { error: memberError } = await supabaseAdmin
    .from("store_members")
    .insert({
      store_id: storeData.id,
      user_id: user.id,
      created_by: user.id,
    });

  if (memberError) {
    return NextResponse.json(memberError.message);
  }

  return NextResponse.json("success");
}
