"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const JoinStorePage = () => {
  const route = useRouter();

  const setUpHandler = (event: FormEvent) => {
    event.preventDefault();

    route.push("/auth/setMemberInfo");
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={setUpHandler} className={styles.form}>
          <TextInput placeholder="Store ID" />
          <PasswordInput placeholder="PW" mt="md" />
          <Button type="submit" fullWidth mt="lg">
            Join
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

export default JoinStorePage;
