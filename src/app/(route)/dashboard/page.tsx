import styles from "@/app/(route)/dashboard/dashboard.module.scss";
import CalendarComponent from "./components/calendar";
import { Button } from "@mantine/core";
import Link from "next/link";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getStores } from "@/app/api/getStores";

const DashboardPage = async () => {
  const storeData = await getStores();
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
        <CalendarComponent />

        <div className={styles.store_list}>
          {storeData && storeData.map((store, index: number) => {
            return(
              <Button fullWidth type="button" mt="sm" key={index}>
                {store.stores?.storename}
              </Button>
            )
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
