import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { getStores } from ".";

export async function POST(req: NextRequest) {
  return NextResponse.json(await getStores());
}
