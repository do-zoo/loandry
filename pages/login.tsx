import React, { useEffect } from "react";
import { Box } from "@mantine/core";
import { LoginForm } from "../components/Form";
import { useSession } from "next-auth/react";
import Router from "next/router";

function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/");
    }
  }, [session]);

  return (
    <Box>
      <LoginForm />
    </Box>
  );
}

export default Login;
