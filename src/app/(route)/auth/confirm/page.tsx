import { Metadata } from "next";
import styles from "@/app/(route)/auth/auth.module.scss";
import ConfirmComponent from "./confirmComponent";

export const metadata: Metadata = {
  title: "confirm · auth · planify",
};

const AuthConfirmPage = ({ searchParams }: { searchParams: { confirmUrl: string } }) => {  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className="logo">
            <span className="hidden">planify</span>
          </div>
        </div>

        <ConfirmComponent confirmUrl={searchParams.confirmUrl} />
      </div>
    </>
  );
};

export default AuthConfirmPage;
