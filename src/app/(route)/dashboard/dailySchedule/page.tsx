import "server-only";
import { Metadata } from "next";
import DailyScheduleComponent from "./dailyScheduleComponent";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { DateTime } from "luxon";

export const metadata: Metadata = {
  title: "daily schedule · planify",
};

const DailySchedulePage = async () => {
  const supabase = createServer();
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  console.log(user.id);

  // stores 에서 내가 속한 store의 id, storename 가져오기
  const { data: storeData, error: storeError } = await supabaseAdmin
    .from("store_members")
    .select("store_id, stores(storename)")
    .eq("user_id", user.id);

  console.log(storeData);
  if (storeError) {
    console.log(storeError);
    return;
  }

  DateTime.now().toISOTime({includeOffset:false})

  // store_members 에서 내가 속한 store의 store_id 를 가진 user_id와 users(username) 가져오기
  const { data: memberData, error: memberError } = await supabaseAdmin
    .from("store_members")
    .select("user_id, users!store_members_user_id_fkey(username)")
    .eq("store_id", storeData[0].store_id)

  /**
   * SELECT user_id users.username FROM store_members
   * JOIN users ON store_members.user_id = users.id
   * WHERE store_members.store_id = fjlsadf
   */

  console.log(memberData, memberError)
  return (
    <>
      <DailyScheduleComponent />
    </>
  );
};

export default DailySchedulePage;
