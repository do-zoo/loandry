import { Box, Stack, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";

function Orders() {
  return (
    <>
      <Head>
        <title>Pesanan | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="lg">
        <Title order={3}>Daftar Pesanan</Title>
        <Box>Daftar Pesanan</Box>
      </Stack>
    </>
  );
}

export default Orders;
