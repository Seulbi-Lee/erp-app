import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import "server-only";

export const getStores = async () => {
  const supabaseAuth = createServer();
  const supabase = createAdmin();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    throw new Error();
  }

  const {
    data: storeData,
    error: storeError,
    status,
    statusText,
  } = await supabase
    .from("store_members")
    .select("store_id, color, stores(storename)")
    .eq("user_id", user.id);

  if (storeError) {
    throw new Error();
  }

  const newData = storeData.map((data) => {
    return {
      store_id: data.store_id,
      storename: data.stores!.storename,
      color: data.color,
    };
  });

  return newData;
};
