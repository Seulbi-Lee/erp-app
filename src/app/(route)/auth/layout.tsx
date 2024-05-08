import { Metadata } from "next";

export const metadata: Metadata = {
  title: "auth · planify",
};

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout;