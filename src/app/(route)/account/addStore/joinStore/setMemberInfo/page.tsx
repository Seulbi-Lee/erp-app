"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/utils/supabase/client";
import { Anchor, Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SetMemberInfoPage = () => {
  const supabase = createClient();
  const route = useRouter();

  const setUpHandler = async (event: FormEvent) => {
    event.preventDefault();


    route.push("/dashboard");
  };

  return (
    <>
      <form onSubmit={setUpHandler} className={styles.form}>
        <TextInput placeholder="Hourly rate" mt="lg"/>
        <TextInput placeholder="Position" mt="md" />
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
    </>
  );
};

export default SetMemberInfoPage;
