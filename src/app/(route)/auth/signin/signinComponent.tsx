"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/utils/supabase/client";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const SignInComponent = () => {
  // const emailRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const route = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "drizzle8926@gmail.com",
      password: "qwer1234",
    },
  });

  const signinHandler = async (values: { email: string; password: string }) => {
    const { error: signinError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signinError) {
      if (signinError.status === 400) {
        alert("Wrong username or passowrd");
      } else {
        alert("Unknown Error: try again");
      }
    }

    route.push("/dashboard");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className="logo">
            <span className="hidden">planify</span>
          </div>
        </div>

        <form
          onSubmit={form.onSubmit((values) => signinHandler(values))}
          className={styles.form}
        >
          <TextInput
            placeholder="Email"
            withAsterisk
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            placeholder="PW"
            withAsterisk
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="lg" type="submit">
            login
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor mt="lg" href="/auth/signup" target="_self">
            Sign up
          </Anchor>
          <Anchor mt="lg" href="/auth/forgotPw" target="_self">
            Forgot PW
          </Anchor>
        </div>
      </div>
    </>
  );
};

export default SignInComponent;
