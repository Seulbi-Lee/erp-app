"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const ResetPasswordPage = () => {
  const route = useRouter();

  const setUpHandler = (event: FormEvent) => {
    event.preventDefault();

    route.push("/dashboard");
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={setUpHandler} className={styles.form}>
          <PasswordInput placeholder="Password" />
          <PasswordInput placeholder="Password" mt="md" />
          <Button fullWidth mt="lg" type="submit">
            Reset password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
