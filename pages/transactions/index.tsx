import { useState } from 'react';
import { TransactionModal } from '@/components/Modals';
import { APP_NAME } from '@/variables/index';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { TransactionsService } from '@/services/transaction.services';
import { ITransaction } from '@/types/res';
import { TransactionTable } from '@/components/Table';

interface IProps {
  data: ITransaction[];
}

function Transactions({ data }: IProps) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [modalType, setModalType] = useState<'create' | 'update'>('create');

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
          <TransactionTable transactions={data} />
        </Box>
      </Stack>
      <TransactionModal
        opened={opened}
        onClose={handleCloseModal}
        modalType={modalType}
      />
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await TransactionsService.getAllTransaction();

  // Pass data to the page via props
  return { props: { data } };
}

export default Transactions;
