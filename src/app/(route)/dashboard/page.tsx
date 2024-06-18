import "server-only";
import { Button } from "@mantine/core";
import Link from "next/link";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { getStores } from "@/app/api/getStores";
import { Metadata } from "next";
import CalendarComponent from "@/app/shared/calendar/CalendarComponent";
import AmountComponent from "@/app/shared/amounts/amount.component";
import HeaderComponent from "@/app/shared/header/headerComponent";

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

  console.log(storeData);

  return (
    <>
      <HeaderComponent username={userData?.username} storeData={storeData} />

      <div className="main">
        <div className="content">
          <CalendarComponent />

          <div className="container-inner">
            {storeData &&
              storeData.map(
                (store: {
                  store_id: string;
                  storename: string | undefined;
                  color: any;
                }) => {
                  return (
                    <Link
                      href={`/store/${store.store_id}/schedule`}
                      key={store.store_id}
                    >
                      <Button
                        fullWidth
                        type="button"
                        mt="sm"
                        variant="outline"
                        color={store.color}
                      >
                        {store.storename}
                      </Button>
                    </Link>
                  );
                }
              )}

            <Link href="/account/addStore" target="_self">
              <Button fullWidth type="button" mt="sm">
                + Add Store
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed-bottom">
        <AmountComponent />
      </div>
    </>
  );
};

export default DashboardPage;
