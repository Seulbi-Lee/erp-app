import { createAdmin } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabaseAdmin = createAdmin();

  const { data: deleteData, error: deleteError } = await supabaseAdmin
    .from("stocks")
    .delete()
    .eq("id", data);

  if (deleteError) {
    return NextResponse.json(deleteError.details);
  }

  return NextResponse.json("delete successful");
}
