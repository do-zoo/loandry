import { TransactionModal } from '@/components/Modals';
import { TransactionTable } from '@/components/Table';
import { TransactionsService } from '@/services/transaction.services';
import { APP_NAME } from '@/variables/index';
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Title,
} from '@mantine/core';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

function Transactions() {
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update'>('create');

  const { data: transactionsApi, isFetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: TransactionsService.getAllTransaction,
  });

  const transactions = useMemo(
    () =>
      transactionsApi?.data && Array.isArray(transactionsApi.data)
        ? transactionsApi.data
        : [],
    [transactionsApi?.data]
  );

  const handleCloseModal = () => {
    setOpened(false);
  };

  const handleAddTransaction = () => {
    setOpened(true);
    setModalType('create');
  };
  const handleUpdateTransaction = () => {
    setOpened(true);
    setModalType('update');
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
            <Button color="green" onClick={handleUpdateTransaction}>
              Selesaikan Transaksi
            </Button>
            <Button onClick={handleAddTransaction}>Transaksi Baru</Button>
          </Group>
        </Group>
        <Box>
          <TransactionTable transactions={transactions} />
        </Box>
      </Stack>
      <TransactionModal
        opened={opened}
        onClose={handleCloseModal}
        modalType={modalType}
      />
      <LoadingOverlay visible={isFetching} overlayBlur={10} mih="100vh" />
    </>
  );
}

export default Transactions;
