import "server-only";
import { Metadata } from "next";
import DailyScheduleComponent from "./dailyScheduleComponent";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { DateTime } from "luxon";
import { constrainedMemory } from "process";

export const metadata: Metadata = {
  title: "daily schedule · planify",
};

const DailySchedulePage = async () => {
  // const supabase = createServer();
  const supabaseAdmin = createAdmin();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) return;
  // console.log(user.id);

  const storeId = "8863577c-4b0d-4da0-b861-7da685b5a471";

  // stores 에서 storename 가져오기
  const { data: storeData, error: storeError } = await supabaseAdmin
    .from("stores")
    .select("storename")
    .eq("id", storeId);

  if (storeError) {
    console.log(storeError);
    return;
  }

  // console.log(DateTime.now().toISOTime({ includeOffset: false }));

  // store_members 에서 user_id와 users(username) 가져오기
  const { data: memberData, error: memberError } = await supabaseAdmin
    .from("store_members")
    .select("user_id, users!store_members_user_id_fkey(username)")
    .eq("store_id", storeId);

  /**
   * SELECT user_id users.username FROM store_members
   * JOIN users ON store_members.user_id = users.id
   * WHERE store_members.store_id = fjlsadf
   */

  // console.log(memberData, memberError);

  return (
    <>
      
      <DailyScheduleComponent storeData={storeData} memberData={memberData} />
    </>
  );
};

export default DailySchedulePage;
