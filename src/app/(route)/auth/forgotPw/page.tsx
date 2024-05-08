"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Anchor, Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const ForgotPasswordPage = () => {
  const route = useRouter();

  const setUpHandler = (event: FormEvent) => {
    event.preventDefault();

    route.push("/auth/resetPw");
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={setUpHandler} className={styles.form}>
          <TextInput placeholder="Email" error="Invalid name" />
          <Button fullWidth mt="lg" type="submit">
            Send Email
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor
            mt="lg"
            href="/auth/signin"
            className={styles.anchor}
            target="_self"
          >
            Cancel
          </Anchor>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
