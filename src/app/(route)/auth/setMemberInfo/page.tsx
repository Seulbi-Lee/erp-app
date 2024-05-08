"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SetMemberInfoPage = () => {
  const route = useRouter();

  const setUpHandler = (event: FormEvent) => {
    event.preventDefault();

    route.push("/dashboard");
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Store name</h2>
        <form onSubmit={setUpHandler} className={styles.form}>
          <TextInput placeholder="Hourly rate" mt="lg"/>
          <PasswordInput placeholder="Position" mt="md" />
          <Button type="submit" fullWidth mt="lg">
            Complete
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor
            mt="lg"
            href="/dashboard"
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

export default SetMemberInfoPage;
