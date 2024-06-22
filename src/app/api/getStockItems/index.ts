import "server-only";
import { createAdmin } from "@/utils/supabase/admin";

export const getStockItems = async (data: { storeId: string }) => {
  const supabaseAdmin = createAdmin();
  const storeId = data.storeId;

  if (!storeId) return null;

  // get stock items
  const { data: stockData, error: stockError } = await supabaseAdmin
    .from("stocks")
    .select("*")
    .eq("store_id", storeId);

  if (stockError) {
    throw console.log(stockError.details);
  }

  return stockData;
};
