import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getStockItems } from ".";

export async function POST (req: NextRequest) {
  const storeId = await req.json();

  return NextResponse.json(await getStockItems(storeId));
}