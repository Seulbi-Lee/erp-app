import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import "server-only"

export const getStores = async () => {
  const supabaseAuth = createServer();
  const supabase = createAdmin();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    throw new Error();
    // return NextResponse.json("no user", { status: 401 });
  }

  const { data: storeData, error: storeError, status, statusText } = await supabase
    .from("store_members")
    .select("stores(storename)")
    .eq("user_id", user.id)
  if(storeError) {
    throw new Error();
    // return NextResponse.json(storeError.message, {status, statusText})
  }

  // return NextResponse.json(storeData);
  return storeData
}