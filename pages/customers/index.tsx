import { Box, Stack, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";

function Customers() {
  return (
    <>
      <Head>
        <title>Pelanggan | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="lg">
        <Title order={3}>Daftar Pelanggan</Title>
        <Box>Daftar Pelanggan</Box>
      </Stack>
    </>
  );
}

export default Customers;
