import { createAdmin } from "@/utils/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabaseAdmin = createAdmin();

  const { data: stockData, error: stockError } = await supabaseAdmin
    .from("stocks")
    .insert({
      store_id: data.storeId,
      name: data.itemName,
      min_quantity: data.minQuantity,
      price: data.price,
    })
    .select("*")
    .single();

  if (stockError) {
    return NextResponse.json(stockError, { status: 400 });
  }

  const { data: historyData, error: historyError } = await supabaseAdmin
    .from("stocks_history")
    .insert({
      stocks_id: stockData.id,
      curr_quantity: data.currQuantity,
    })
    .select("*")
    .single();

  if (historyError) {
    return NextResponse.json(historyError, { status: 400 });
  }

  return NextResponse.json({ stockData, historyData });
}
