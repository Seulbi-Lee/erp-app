import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { Metadata } from "next";
import StoreScheduleComponent from "./scheduleComponent";

export const metadata: Metadata = {
  title: "dashboard · planify",
};

const StoreSchedulePage = async () => {
  const supabaseAuth = createServer();
  const supabase = createAdmin();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) return;

  return (
    <>
      <StoreScheduleComponent />
    </>
  );
};

export default StoreSchedulePage;
