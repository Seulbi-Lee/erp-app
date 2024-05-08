"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Button } from "@mantine/core";
import Link from "next/link";

const AddStorePage = () => {
  return (
    <>
      <div className={styles.container}>
        <Link href="/auth/newStore" target="_self">
          <Button fullWidth mt="lg" type="button">
            New Store
          </Button>
        </Link>
        <Link href="/auth/joinStore" target="_self">
          <Button fullWidth mt="lg" type="button">
            Join Store
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AddStorePage;
