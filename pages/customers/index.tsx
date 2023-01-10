import { CustomerTable } from "@/components/Table";
import { createCustomers } from "@/utils/faker";
import { Box, Stack, Title } from "@mantine/core";
import Head from "next/head";

function Customers() {
  return (
    <>
      <Head>
        <title>Pelanggan | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="lg">
        <Title order={3}>Daftar Pelanggan</Title>
        <Box>
          <CustomerTable customers={createCustomers(10)} />
        </Box>
      </Stack>
    </>
  );
}

export default Customers;
