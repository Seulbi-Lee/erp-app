import { createServer } from "@/app/utils/supabase/server";
import React from "react";
import SetUserInfoComponent from "./setUserInfoComponent";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign up · planify",
};

const SetUserInfoPage = async () => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  if (!session) {
    redirect("/auth");
  }

  const uid = session!.user.id;
  const fullname = session!.user.user_metadata.fullname;

  return (
    <>
      <SetUserInfoComponent uid={uid} fullname={fullname} />
    </>
  );
};

export default SetUserInfoPage;
