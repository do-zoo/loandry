import { CustomerTable } from '@/components/Table';
import { useAppDispatch } from '@/hooks/redux';
import { setModalPrepare } from '@/stores/features/modal/modal.slice';
import { createCustomers } from '@/utils/faker';
import { modalCreateCustomerMessage } from '@/variables/modal';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';

function Customers() {
  const dispatch = useAppDispatch();

  const handleAddCustomer = () => {
    dispatch(
      setModalPrepare({
        visibility: true,
        data: modalCreateCustomerMessage,
      })
    );
  };
  return (
    <>
      <Head>
        <title>Pelanggan | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="xl">
        <Group position="apart">
          <Title order={3}>Daftar Pelanggan</Title>
          <Button onClick={handleAddCustomer}>Pelanggan Baru</Button>
        </Group>
        <Box>
          <CustomerTable customers={createCustomers(10)} />
        </Box>
      </Stack>
    </>
  );
}

export default Customers;
