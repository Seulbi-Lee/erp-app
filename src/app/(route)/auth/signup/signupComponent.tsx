"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/utils/supabase/client";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useState } from "react";

const SignupComponent = () => {
  const supabase = createClient();
  const [ sendEmail, setSendEmail ] = useState<string>("Sign up");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }, "Name must be 2-10 characters long"),
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 6 },
        "Password must be over 6 characters long"
      ),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const signUpHandler = async (values: { name: string; email: string; password: string; confirmPassword: string; }) => {
    const { error: signupError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          originUrl: location.origin,
          fullname: values.name,
        },
        emailRedirectTo: location.origin,
      },
    });

    if (signupError) {
      console.log(signupError);
      alert("Unknown Error: try again");
      return;
    }

    setSendEmail("Resend Email");

    alert("check your email");
  }

  return (
    <>
      <div className={styles.container}>
        <form
          onSubmit={form.onSubmit((values) => signUpHandler(values))}
          className={styles.form}
        >
          <TextInput
            placeholder="Email"
            withAsterisk
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="md"
            placeholder="Fullname"
            withAsterisk
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <PasswordInput
            mt="md"
            placeholder="password"
            withAsterisk
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            mt="md"
            placeholder="confirm password"
            withAsterisk
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="lg" type="submit">
            {sendEmail}
          </Button>
        </form>

        <div className={styles.anchors}>
          <Anchor
            mt="lg"
            href="/auth/signin"
            className={styles.anchor}
            target="_self"
          >
            Login
          </Anchor>
        </div>
      </div>
    </>
  );
};

export default SignupComponent;
