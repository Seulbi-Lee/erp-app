import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const WhateverPage = async() => {
  const supabase = createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return <>Whatever</>
}

export default WhateverPage;