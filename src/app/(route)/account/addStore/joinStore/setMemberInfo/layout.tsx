import styles from "@/app/(route)/auth/auth.module.scss";
import { Metadata } from "next";
import SetMemberInfoPage from "./page";
import { createServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "member info · planify",
};

const SetMemberInfoLayout = async() => {
  const supabase = createServer();

  const { data: memberData, error: memberError } = await supabase
    .from("store_members")
    .select(
      "stores(storename)"
    )

  if(!memberData) return;
  const storename: any = memberData[0].stores;

  if (memberError) {
    console.error(memberError);
    return;
  }

  return (
    <>
      <div className={styles.container}>
        <h2>{storename.storename}</h2>
        <SetMemberInfoPage />
      </div>
    </>
  )
}

export default SetMemberInfoLayout;