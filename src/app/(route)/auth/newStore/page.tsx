"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const NewStorePage = () => {
  const route = useRouter();

  const setUpHandler = (event: FormEvent) => {
    event.preventDefault();

    route.push("/dashboard");
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={setUpHandler} className={styles.form}>
          <TextInput placeholder="Storename" />
          <PasswordInput placeholder="PW" mt="md" />
          <Button type="submit" fullWidth mt="lg">
            Create
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

export default NewStorePage;
