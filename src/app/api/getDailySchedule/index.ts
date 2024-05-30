import "server-only";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";

export const getDailySchedule = async () => {
  const supabase = createServer();
  const supabaseAdmin = createAdmin();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error();
  }

  const { data: scheduleData, error: scheduleError } = await supabaseAdmin
    .from("schedules")
    .select("*")
    .eq("user_id", user.id);

  if (scheduleError) {
    throw new Error();
  }

  return scheduleData;
};
