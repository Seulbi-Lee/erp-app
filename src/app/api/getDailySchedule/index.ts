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
      .select("*, stores(storename, store_members(color))")
      .eq("user_id", user.id)
      .eq("stores.store_members.user_id", user.id)
      .gte("date", startDate.toISODate())
      .lte("date", endDate.toISODate());

    if (scheduleError) {
      throw new Error(scheduleError.details);
    }

    const newData = scheduleData.map((data) => {
      return {
        id: data.id,
        date: data.date,
        start: data.start,
        end: data.end,
        user_id: data.user_id,
        store_id: data.store_id,
        amounts: data.amounts,
        storename: data.stores?.storename,
        color: data.stores?.store_members[0].color,
      };
    });

    return newData;
  }

  const { data: scheduleData, error: scheduleError } = await supabaseAdmin
    .from("schedules")
    .select("*, stores(storename, store_members(color))")
    .eq("user_id", user.id)
    .eq("store_id", storeId)
    .eq("stores.store_members.user_id", user.id)
    .gte("date", startDate.toISODate())
    .lte("date", endDate.toISODate());

  if (scheduleError) {
    throw new Error();
  }

  const newData = scheduleData.map((data) => {
    return {
      id: data.id,
      date: data.date,
      start: data.start,
      end: data.end,
      user_id: data.user_id,
      store_id: data.store_id,
      amounts: data.amounts,
      storename: data.stores?.storename,
      color: data.stores?.store_members[0].color,
    };
  });

  return newData;
};
