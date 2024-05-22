"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import {
  Anchor,
  Button,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JoinStoreComponent = () => {
  const route = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      storename: "",
      password: "",
    },

    validate: (values) => ({
      storename: values.storename === "" ? "storename is required" : null,
      password: values.password === "" ? "password is required" : null,
    }),
  });

  const setUpHandler = async (values: {
    storename: string;
    password: string;
  }) => {
    // fetch("/api/setStoreMembers", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    // }).then((Response) => {
    //   if (!Response.ok) {
    //     throw new Error("Failed to submit the data. Please try again.");
    //   }

    //   Response.json().then((data) => {
    //     console.log(data);
    //   });
    // });

    const res = await fetch("/api/setStoreMembers", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    if (data !== "success") {
      alert(data);
      return;
    }
    console.log(data)
    route.push("/account/addStore/joinStore/setMemberInfo");
  };

  return (
    <>
      <div className={styles.container}>
        <form
          onSubmit={form.onSubmit((values) => setUpHandler(values))}
          className={styles.form}
        >
          <TextInput
            placeholder="Store name"
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
            Join
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor
            component={Link}
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

export default JoinStoreComponent;
