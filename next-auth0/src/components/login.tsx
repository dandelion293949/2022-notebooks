import React from "react";
import { Button, Classes, Intent } from "@blueprintjs/core";
import { useRouter } from "next/router";

export const Login: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Button className={Classes.BUTTON} intent={Intent.NONE} onClick={() => router.push("/api/auth/login")}>
        Login
      </Button>
    </>
  );
};
