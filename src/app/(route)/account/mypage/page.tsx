"use client";

import { createClient } from "@/utils/supabase/client";
import { Button, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";

const JoinStorePage = () => {
  const supabase = createClient();
  const router = useRouter();

  const signOutHandler = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error(signOutError);
      return;
    }
    router.push("/auth/signin");
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        direction="column"
        mih={500}
        gap="md"
      >
        <Button onClick={() => router.push("/dashboard")}>Home</Button>
        <Button onClick={signOutHandler}>logout</Button>
      </Flex>
    </>
  );
};

export default JoinStorePage;
