import { CreateCustomerModal } from '@/components/Modals';
import { CustomerTable } from '@/components/Table';
import { CustomerService } from '@/services/customer.services';
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

function Customers() {
  const [opened, setOpened] = useState(false);

  const { data: customersApi, isFetching } = useQuery({
    queryKey: ['customers'],
    queryFn: CustomerService.getAllCustomer,
  });

  const customers = useMemo(
    () =>
      customersApi?.data && Array.isArray(customersApi.data)
        ? customersApi.data
        : [],
    [customersApi?.data]
  );

  const handleCloseModal = () => {
    setOpened(false);
  };

  const handleAddCustomer = () => {
    setOpened(true);
  };
  return (
    <>
      <Head>
        <title>{`Pelanggan | ${APP_NAME}`}</title>
      </Head>
      <Stack spacing="xl">
        <Group position="apart">
          <Title order={3}>Daftar Pelanggan</Title>
          <Button onClick={handleAddCustomer}>Pelanggan Baru</Button>
        </Group>
        <Box>
          <CustomerTable customers={customers} />
        </Box>
      </Stack>
      <CreateCustomerModal onClose={handleCloseModal} opened={opened} />
      <LoadingOverlay visible={isFetching} overlayBlur={10} mih="100vh" />
    </>
  );
}

export default Customers;
