import styles from "@/app/(route)/auth/auth.module.scss";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "add store · planify",
};

const AddStorePage = () => {
  return (
    <>
      <div className={styles.container}>
        <Link href="/account/addStore/newStore" target="_self">
          <Button fullWidth mt="lg" type="button">
            New Store
          </Button>
        </Link>
        <Link href="/account/addStore/joinStore" target="_self">
          <Button fullWidth mt="lg" type="button">
            Join Store
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AddStorePage;
