import { CustomerTable } from '@/components/Table';
import { createCustomers } from '@/utils/faker';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';

function Customers() {
  return (
    <>
      <Head>
        <title>Pelanggan | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="xl">
        <Group position="apart">
          <Title order={3}>Daftar Pelanggan</Title>
          <Button>Pelanggan Baru</Button>
        </Group>
        <Box>
          <CustomerTable customers={createCustomers(10)} />
        </Box>
      </Stack>
      {/* <RFIdSuccess /> */}
    </>
  );
}

export default Customers;
