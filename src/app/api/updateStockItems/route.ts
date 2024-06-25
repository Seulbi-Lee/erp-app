import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabaseAuth = createServer();
  const supabaseAdmin = createAdmin();
  const today = DateTime.now().toFormat("yyyy-MM-dd");

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) return;

  const newData = data.map((item: { id: string; curr_quantity: number }) => {
    return {
      stocks_id: item.id,
      created_by: user.id,
      date: today,
      quantity: item.curr_quantity,
    };
  });

  const { data: selectData, error: selectError } = await supabaseAdmin
    .from("stocks_history")
    .upsert(newData)
    .select("");

  if (selectError) {
    return NextResponse.json(selectError.details);
  }

  return NextResponse.json("update completed");
}
