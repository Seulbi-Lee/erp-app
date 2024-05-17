"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ConfirmComponent = ({confirmUrl}: {confirmUrl: string}) => {
  const route = useRouter();
  const [ disabled, setDisabled ] = useState<boolean>(false);
 
  const buttonHandler = () => {
    if(!confirmUrl) {
      alert('There is no confirmUrl');
      return; 
    }
    setDisabled(true);
    route.push(confirmUrl);
  }

  return (
    <>
      <Button mt="lg" onClick={buttonHandler} disabled={disabled}>
        confirm
      </Button>
    </>
  );
}

export default ConfirmComponent;