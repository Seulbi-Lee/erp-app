"use client";

import styles from "@/app/(route)/auth/auth.module.scss";
import { createClient } from "@/app/utils/supabase/client";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

const SignupPage = () => {
  const supabase = createClient();
  const route = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [fullnameError, setFullnameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validationHandler = () => {
    if (passwordAgainRef.current?.value !== "") {
      if (passwordRef.current?.value !== passwordAgainRef.current?.value) {
        setPasswordError("Incorrect Password");
        return;
      }
      setPasswordError(null);
      return;
    }
    setPasswordError(null);
  };

  const signUpHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current || !fullnameRef.current){
      return;
    }
    // validation check
    if (!emailRef.current.value.trim()) {
      setEmailError("Invalid Value");
    }
    if (!passwordRef.current.value.trim()) {
      setPasswordError("Invalid Value");
    }
    if (!fullnameRef.current.value.trim()) {
      setFullnameError("Invalid Value");
    }

    // DB connect
    if (
      emailRef.current.value.trim() ||
      passwordRef.current.value.trim() ||
      fullnameRef.current.value.trim()
    ) {
      const { error: signupError } = await supabase.auth.signUp({
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
        options: {
          emailRedirectTo: "http://localhost:3000/api/auth",
          data: {
            fullname: fullnameRef.current.value.trim(),
          },
        },
      });

      if (signupError) {
        alert("Unknown Error: try again");
        return;
      }

      alert("check your email");

      route.push("/");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={signUpHandler} className={styles.form}>
          <TextInput
            ref={emailRef}
            placeholder="Email"
            error={emailError}
            onChange={() => {
              if (emailRef.current?.value !== "") setEmailError(null);
            }}
          />
          <TextInput
            ref={fullnameRef}
            mt="md"
            placeholder="Fullname"
            error={fullnameError}
            onChange={() => {
              if (fullnameRef.current?.value !== "") setFullnameError(null);
            }}
          />
          <PasswordInput
            ref={passwordRef}
            mt="md"
            placeholder="PW"
            error={passwordError}
            onChange={validationHandler}
          />
          <PasswordInput
            ref={passwordAgainRef}
            mt="md"
            placeholder="PW"
            onChange={validationHandler}
          />
          <Button fullWidth mt="lg" type="submit">
            Sign up
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

export default SignupPage;
