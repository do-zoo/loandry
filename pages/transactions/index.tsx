import { useState } from 'react';
import { CreateTransaction } from '@/components/Modals';
import { APP_NAME } from '@/variables/index';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';

function Transactions() {
  const [opened, setOpened] = useState(false);

  const handleCloseModal = () => {
    setOpened(false);
  };

  const handleAddTransaction = () => {
    setOpened(true);
  };
  return (
    <>
      <Head>
        <title>{`Transaksi | ${APP_NAME}`}</title>
      </Head>
      <Stack spacing="lg">
        <Group position="apart">
          <Title order={3}>Daftar Transaksi</Title>
          <Group>
            <Button color="green">Selesaikan Transaksi</Button>
            <Button onClick={handleAddTransaction}>Transaksi Baru</Button>
          </Group>
        </Group>
        <Box>
          {/* <TransactionTable transactions={createTransactions(10)} /> */}
        </Box>
      </Stack>
      <CreateTransaction opened={opened} onClose={handleCloseModal} />
    </>
  );
}

export default Transactions;
