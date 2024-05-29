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
  const storeData = await getStores(); //api

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
      <header className="header">
        <Link href="/account/mypage">{userData?.username}</Link>
      </header>

      <div className="main">
        <div className="content">
          <CalendarComponent />

          <div className="container-inner">
            {storeData &&
              storeData.map((store, index: number) => {
                return (
                  <Link
                    href={"/dashboard/store/schedule?id=" + store.store_id}
                    key={index}
                  >
                    <Button fullWidth type="button" mt="sm">
                      {store.stores?.storename}
                    </Button>
                  </Link>
                );
              })}

            <Link href="/account/addStore" target="_self">
              <Button fullWidth type="button" mt="sm">
                + Add Store
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed-bottom">
        <div className="pay-amount">
          <span>$ 0.00</span>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
