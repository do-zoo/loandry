import { CreateCustomer } from '@/components/Modals';
import { CustomerTable } from '@/components/Table';
import { CustomerService } from '@/services/customer.services';
import { ICustomer } from '@/types/res';
import { APP_NAME } from '@/variables/index';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';

interface IProps {
  data: ICustomer[];
}
function Customers({ data }: IProps) {
  const [opened, setOpened] = useState(false);

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
          <CustomerTable customers={data} />
        </Box>
      </Stack>
      <CreateCustomer onClose={handleCloseModal} opened={opened} />
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await CustomerService.getAllCustomer();

  // Pass data to the page via props
  return { props: { data } };
}

export default Customers;
