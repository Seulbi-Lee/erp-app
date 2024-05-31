import "server-only";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { Metadata } from "next";
import StoreScheduleComponent from "./storeScheduleComponent";

export const metadata: Metadata = {
  title: "schedule · planify",
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
