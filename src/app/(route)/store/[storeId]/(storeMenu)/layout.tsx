import "server-only";

import styles from "@/app/main.module.scss";
import HeaderComponent from "@/app/shared/header/headerComponent";
import { createServer } from "@/utils/supabase/server";
import { createAdmin } from "@/utils/supabase/admin";
import { getStores } from "@/app/api/getStores";
import AmountComponent from "@/app/shared/amounts/amount.component";
import NavComponent from "@/app/shared/nav/navComponent";

const StoreLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabaseAuth = createServer();
  const supabase = createAdmin();
  const storeData = await getStores();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) return;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  return (
    <>
      <div className={styles.container}>
        <HeaderComponent username={userData?.username} storeData={storeData} />
        {children}
        <div className="fixed-bottom">
          <AmountComponent />
          <NavComponent />
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
