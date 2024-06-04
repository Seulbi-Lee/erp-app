import "server-only";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { DateObjectUnits, DateTime } from "luxon";

export const getDailySchedule = async (
  monthData: DateObjectUnits | undefined
) => {
  const supabase = createServer();
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error();
  }

  const startDate = DateTime.fromObject(monthData!).startOf("month");
  const endDate = startDate.endOf("month");

  const { data: scheduleData, error: scheduleError } = await supabaseAdmin
    .from("schedules")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", startDate.toISODate())
    .lte("date", endDate.toISODate());

  if (scheduleError) {
    throw new Error();
  }

  return scheduleData;
};
