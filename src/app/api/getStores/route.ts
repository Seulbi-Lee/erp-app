import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getStores } from ".";

export async function POST(req: NextRequest) {
  return NextResponse.json(await getStores());
}
