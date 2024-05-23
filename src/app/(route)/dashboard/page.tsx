import styles from "@/app/(route)/dashboard/dashboard.module.scss";
import { Button } from "@mantine/core";
import Link from "next/link";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { getStores } from "@/app/api/getStores";
import CalendarComponent from "./calendar/CalendarComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard · planify",
};

const DashboardPage = async () => {
  const storeData = await getStores();

  const supabaseAuth = createServer();
  const supabase = createAdmin();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) return;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  // const storeData = await fetch("http://localhost:3000/api/getStores", {
  //   method: 'POST',
  //   headers: {
  //     cookies: cookies().toString()
  //   }
  // }).then(res => {
  //   if (!res.ok) {
  //     console.error(res)
  //     throw new Error();
  //   }

  //   return res.json()
  // })

  return (
    <>
      <div className={styles.container}>
        <div>{userData?.username}</div>

        <CalendarComponent />

        <div className="container-inner">
          {storeData &&
            storeData.map((store, index: number) => {
              return (
                <Button fullWidth type="button" mt="sm" key={index}>
                  {store.stores?.storename}
                </Button>
              );
            })}

          <Link href="/account/addStore" target="_self">
            <Button fullWidth type="button" mt="sm">
              + Add Store
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
