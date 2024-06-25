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

  // update current quantity
  data.map(async (item: { id: string; curr_quantity: number }) => {
    const { error: stocksError } = await supabaseAdmin
      .from("stocks")
      .update({ curr_quantity: item.curr_quantity })
      .eq("id", item.id);

    if (stocksError) {
      return NextResponse.json(stocksError.details);
    }
  });

  // upsert quantity history
  const newData = data.map((item: { id: string; curr_quantity: number }) => {
    return {
      stocks_id: item.id,
      created_by: user.id,
      date: today,
      quantity: item.curr_quantity,
    };
  });

  const { data: selectData, error: historyError } = await supabaseAdmin
    .from("stocks_history")
    .upsert(newData, { onConflict: "stocks_id, date" })
    .select("");

  if (historyError) {
    return NextResponse.json(historyError.details);
  }

  console.log(data);

  return NextResponse.json("update completed");
}
