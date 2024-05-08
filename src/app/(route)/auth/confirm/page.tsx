import { Metadata } from "next";
import { Button } from "@mantine/core";
import styles from "@/app/(route)/auth/auth.module.scss";

export const metadata: Metadata = {
  title: "auth · planify",
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

        <Button mt="lg" component="a" href={searchParams.confirmUrl}>
          confirm
        </Button>
      </div>
    </>
  );
};

export default AuthConfirmPage;
