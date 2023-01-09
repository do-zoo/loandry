import React, { useEffect } from "react";
import { Box } from "@mantine/core";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { LoginForm } from "@/components/Form";
import Head from "next/head";

function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/");
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Selamat Datang | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box>
        <LoginForm />
      </Box>
    </>
  );
}

export default Login;
