"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/app/utils/supabase/client";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const SignInComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const supabse = createClient();
  const route = useRouter();

  const signinHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    const { error: signinError } = await supabse.auth.signInWithPassword({
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
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

        <form onSubmit={signinHandler} className={styles.form}>
          <TextInput ref={emailRef} placeholder="Email" />
          <PasswordInput ref={passwordRef} mt="md" placeholder="PW" />
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
