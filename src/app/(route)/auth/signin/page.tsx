import { createServer } from "@/utils/supabase/server";
import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SignInComponent from "./signinComponent";

export const metadata: Metadata = {
  title: "sign in · planify",
};

const SigninPage = async () => {
  // 미들웨어에서 대체함
  // const supabase = createServer();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  //   redirect("/account/mypage");
  // }

  return (
    <>
      <SignInComponent />
    </>
  );
};

export default SigninPage;
