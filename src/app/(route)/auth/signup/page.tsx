import { Metadata } from "next";
import SignupComponent from "./signupComponent";

export const metadata: Metadata = {
  title: "sign up · planify",
};

const SignupPage = () => {
  return (
    <>
      <SignupComponent/>
    </>
  )
}

export default SignupPage;