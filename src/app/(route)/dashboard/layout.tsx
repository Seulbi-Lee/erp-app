import styles from "@/app/(route)/dashboard/dashboard.module.scss";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "dashboard · planify",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // const supabaseAuth = createServer();
  // const supabase = createAdmin();

  // // check user session
  // const {
  //   data: { user },
  // } = await supabaseAuth.auth.getUser();

  // if (!user) return;

  // // check username
  // const { data: usernameData, error: usernameError } = await supabase
  //   .from("users")
  //   .select("username")
  //   .eq("id", user.id);

  // if(usernameError) {
  //   console.log(usernameError);
  //   return;
  // }

  // if (!usernameData.length) {
  //   console.log(0)
  //   redirect("/auth/setUserInfo");
  // }

  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default DashboardLayout;
