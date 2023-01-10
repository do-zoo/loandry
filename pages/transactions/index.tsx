import { TransactionTable } from "@/components/Table";
import { createTransactions } from "@/utils/faker";
import { Box, Button, Group, Stack, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";

function Orders() {
  return (
    <>
      <Head>
        <title>Pesanan | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="lg">
        <Group position="apart">
          <Title order={3}>Daftar Pesanan</Title>
          <Button>Pesanan Baru</Button>
        </Group>
        <Box>
          <TransactionTable transactions={createTransactions(10)} />
        </Box>
      </Stack>
    </>
  );
}

export default Orders;
