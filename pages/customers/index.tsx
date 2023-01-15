import { CustomerTable } from '@/components/Table';
import { useAppDispatch } from '@/hooks/redux';
import { CustomerService } from '@/services/customer.services';
import { setModalPrepare } from '@/stores/features/modal/modal.slice';
import { ICustomer } from '@/types/res';
import { modalCreateCustomerMessage } from '@/variables/modal';
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';

interface IProps {
  data: ICustomer[];
}
function Customers({ data }: IProps) {
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
          <CustomerTable customers={data} />
        </Box>
      </Stack>
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
