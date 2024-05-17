"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/utils/supabase/client";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewStoreComponent = () => {
  const supabase = createClient();
  const route = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      storename: "",
      password: "",
    },
  });

  const setUpHandler = async (values: {
    storename: string;
    password: string;
  }) => {
    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .insert({
        storename: values.storename,
        password: values.password,
      })
      .select("id");

    if (storeError) {
      console.error(storeError);
      return;
    }

    const storeID = storeData[0].id;

    const { error: memberError } = await supabase.from("store_members").insert({
      store_id: storeID,
      manager: true,
      position: 'owner',
    });

    if (memberError) {
      console.error(memberError);
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form
          onSubmit={form.onSubmit((values) => setUpHandler(values))}
          className={styles.form}
        >
          <TextInput
            placeholder="Storename"
            withAsterisk
            key={form.key("storename")}
            {...form.getInputProps("storename")}
          />
          <PasswordInput
            placeholder="PW"
            mt="md"
            withAsterisk
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="lg">
            Create
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor component={Link}
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

export default NewStoreComponent;
