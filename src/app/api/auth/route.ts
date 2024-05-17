import { createServer } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createServer();
  const code = req.nextUrl.searchParams.get("code");
  
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect("http://localhost:3000/account/setUserInfo");
}