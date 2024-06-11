import "server-only";

import styles from "@/app/(route)/dashboard/main.module.scss";
import { Metadata } from "next";
import SetDailyScheduleComponent from "./setDailyScheduleComponent";
import { createAdmin } from "@/utils/supabase/admin";

export const metadata: Metadata = {
  title: "daily schedule · planify",
};

const SetDailySchedulePage = async () => {
  const supabaseAdmin = createAdmin();

  const storeId = "8863577c-4b0d-4da0-b861-7da685b5a471";

  // get storename from stores table
  const { data: storeData, error: storeError } = await supabaseAdmin
    .from("stores")
    .select("storename")
    .eq("id", storeId);

  console.log(storeData);

  if (storeError) {
    console.log(storeError);
    return;
  }

  // get user_id, users(username) from store_members
  const { data: memberData, error: memberError } = await supabaseAdmin
    .from("store_members")
    .select("user_id, users!store_members_user_id_fkey(username)")
    .eq("store_id", storeId);

  /**
   * SELECT user_id users.username FROM store_members
   * JOIN users ON store_members.user_id = users.id
   * WHERE store_members.store_id = fjlsadf
   */

  return (
    <>
      <div className={styles.container}>
        <SetDailyScheduleComponent
          storeData={storeData}
          memberData={memberData}
        />
      </div>
    </>
  );
};

export default SetDailySchedulePage;
