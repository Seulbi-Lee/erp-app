"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/utils/supabase/client";
import { Anchor, Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const SetUserInfoComponent = ({
  uid,
  fullname,
}: {
  uid: string;
  fullname: string;
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const supabase = createClient();
  const route = useRouter();

  const setUpHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!usernameRef.current) return;

    const { error: insertError } = await supabase.from("users").insert({
      id: uid,
      fullname: fullname,
      username: usernameRef.current.value.trim(),
    });

    if (insertError) {
      if (insertError.code === "23505") {
        setUsernameError("Username already exists");
        usernameRef.current.value = "";
        return;
      }
      alert("Unknown Error: try again");
      return;
    }

    alert("saved");

    route.push("/dashboard");
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={setUpHandler} className={styles.form}>
          <TextInput
            ref={usernameRef}
            placeholder="Username"
            error={usernameError}
            onChange={() => {
              setUsernameError(null);
            }}
          />
          <Button fullWidth mt="lg" type="submit">
            Complete
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor
            mt="lg"
            href="/auth/mypage"
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

export default SetUserInfoComponent;
