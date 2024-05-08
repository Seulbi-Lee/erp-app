import { createServer } from "@/app/utils/supabase/server";
import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SignInComponent from "./signinComponent";

export const metadata: Metadata = {
  title: "sign in · planify",
};

const SigninPage = async () => {
  const supabase = createServer();
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  if (session) {
    redirect("/auth/myPage")
  }


  return (
    <>
      <SignInComponent />
    </>
  );
};

export default SigninPage;
