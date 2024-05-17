import { createServer } from "@/utils/supabase/server";
import React from "react";
import SetUserInfoComponent from "./setUserInfoComponent";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign up · planify",
};

const SetUserInfoPage = async () => {
  const supabase = createServer();
  const { data: {user}} = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const uid = user.id;
  const fullname = user.user_metadata.fullname;

  return (
    <>
      <SetUserInfoComponent uid={uid} fullname={fullname} />
    </>
  );
};

export default SetUserInfoPage;
