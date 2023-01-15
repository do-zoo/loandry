import { APP_NAME } from '@/variables/index';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';

function Orders() {
  return (
    <>
      <Head>
        <title>Transaksi | {APP_NAME}</title>
      </Head>
      <Stack spacing="lg">
        <Group position="apart">
          <Title order={3}>Daftar Transaksi</Title>
          <Group>
            <Button color="green">Selesaikan Transaksi</Button>
            <Button>Transaksi Baru</Button>
          </Group>
        </Group>
        <Box>
          {/* <TransactionTable transactions={createTransactions(10)} /> */}
        </Box>
      </Stack>
    </>
  );
}

export default Orders;
