"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { Anchor, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";

const SetMemberInfoComponent = () => {
  const searchParams = useSearchParams();
  const route = useRouter();

  const search = searchParams.get("storename");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      houlyRate: "",
      position: "",
    },
  });

  const setUpHandler = async (values: {
    houlyRate: string;
    position: string;
  }) => {
    const res = await fetch("/api/setMemberInfo", {
      method: "POST",
      body: JSON.stringify({values, search}),
    });

    
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    console.log(data);
    route.push("/dashboard");
  };

  return (
    <>
      <h2>{search}</h2>

      <form
        onSubmit={form.onSubmit((values) => setUpHandler(values))}
        className={styles.form}
      >
        <TextInput
          placeholder="Hourly rate"
          mt="lg"
          withAsterisk
          key={form.key("houlyRate")}
          {...form.getInputProps("houlyRate")}
        />
        <TextInput
          placeholder="Position"
          mt="md"
          withAsterisk
          key={form.key("position")}
          {...form.getInputProps("position")}
        />
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

export default SetMemberInfoComponent;
