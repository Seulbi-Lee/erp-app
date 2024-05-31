import Link from "next/link";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { getStores } from "@/app/api/getStores";
import { Metadata } from "next";
import StoreHeaderComponent from "./storeHeaderComponent";

export const metadata: Metadata = {
  title: "dashboard · planify",
};

const DashboardPage = async ({ children }: { children: React.ReactNode }) => {
  const supabaseAuth = createServer();
  const supabase = createAdmin();
  const storeData = await getStores(); //api

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) return;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  return (
    <>
      <StoreHeaderComponent
        username={userData?.username}
        storeData={storeData}
      />
      {children}
    </>
  );
};

export default DashboardPage;
