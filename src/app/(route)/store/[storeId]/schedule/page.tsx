import "server-only";

import styles from "@/app/(route)/dashboard/main.module.scss";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { Metadata } from "next";
import StoreScheduleComponent from "./storeScheduleComponent";
import { getStores } from "@/app/api/getStores";
import HeaderComponent from "@/app/shared/header/headerComponent";

export const metadata: Metadata = {
  title: "schedule · planify",
};

const StoreSchedulePage = async () => {
  const supabaseAuth = createServer();
  const supabase = createAdmin();
  const storeData = await getStores();

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
      <div className={styles.container}>
        <HeaderComponent username={userData?.username} storeData={storeData} />
        <StoreScheduleComponent />
      </div>
    </>
  );
};

export default StoreSchedulePage;
