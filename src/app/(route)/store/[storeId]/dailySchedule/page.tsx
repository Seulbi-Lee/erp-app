import "server-only";

import styles from "@/app/(route)/dashboard/main.module.scss";
import DailyScheduleComponent from "@/app/shared/dailySchedule/dailyScheduleComponent";
import SetDailyScheduleComponent from "./setDailyScheduleComponent";
import { createAdmin } from "@/utils/supabase/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "daily schedule · planify",
};

const DailySchedulePage = async (props: { params: { storeId: string } }) => {
  const supabaseAdmin = createAdmin();
  const params = props.params;
  const storeId = params.storeId;

  // get storename from stores table
  const { data: storeData, error: storeError } = await supabaseAdmin
    .from("stores")
    .select("storename")
    .eq("id", storeId);

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
        <div className="container-inner">
          <DailyScheduleComponent />

          <SetDailyScheduleComponent
            storeData={storeData}
            memberData={memberData}
          />
        </div>
      </div>
    </>
  );
};

export default DailySchedulePage;
