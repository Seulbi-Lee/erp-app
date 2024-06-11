import "server-only";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { DateObjectUnits, DateTime } from "luxon";

export const getDailySchedule = async (calendarData: {
  monthData: DateObjectUnits | undefined;
  storeId: string | undefined;
}) => {
  const supabase = createServer();
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error();
  }

  const startDate = DateTime.fromObject(calendarData.monthData!).startOf(
    "month"
  );
  const endDate = startDate.endOf("month");
  const storeId = calendarData.storeId;

  if (!storeId) {
    const { data: scheduleData, error: scheduleError } = await supabaseAdmin
      .from("schedules")
      .select("*, stores(storename)")
      .eq("user_id", user.id)
      .gte("date", startDate.toISODate())
      .lte("date", endDate.toISODate());

    if (scheduleError) {
      throw new Error();
    }

    return scheduleData;
  }

  const { data: scheduleData, error: scheduleError } = await supabaseAdmin
    .from("schedules")
    .select("*, stores(storename)")
    .eq("user_id", user.id)
    .eq("store_id", storeId)
    .gte("date", startDate.toISODate())
    .lte("date", endDate.toISODate());

  if (scheduleError) {
    throw new Error();
  }

  return scheduleData;
};
