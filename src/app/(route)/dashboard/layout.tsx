import { createServer } from "@/app/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "dashboard · planify",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServer();
  const auth = await supabase.auth.getSession();
  const session = auth.data.session;

  if (!session) {
    redirect("/auth");
  }

  return <>{children}</>;
};

export default DashboardLayout;
