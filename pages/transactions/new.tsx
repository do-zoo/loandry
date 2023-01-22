import { CustomerService } from '@/services/customer.services';
import { ProductService } from '@/services/product.services';
import { RfIdService } from '@/services/rfid.services';
import { TransactionsService } from '@/services/transaction.services';
import { WeightService } from '@/services/weight.service';
import { ICustomer, IProduct } from '@/types/res';
import { localeSexToId } from '@/utils/index';
import { APP_NAME } from '@/variables/index';
import { CreateTransactionSchema } from '@/variables/schema';
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { IconRefresh } from '@tabler/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';

interface IAddCustomerProps {
  customer: ICustomer;
  products: IProduct[];
}

const CreateTransaction: NextPage<IAddCustomerProps> = props => {
  const { customer, products } = props;
  //   console.log(customer, products);

  const router = useRouter();

  const productOptions = useMemo(() => {
    return products.reduce((acc, curr) => {
      acc.push({
        key: curr._id,
        value: curr._id,
        label: curr.name,
      });
      return acc;
    }, [] as Record<'key' | 'value' | 'label', string>[]);
  }, [products]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: TransactionsService.createTransaction,
  });

  const {
    data: fetchWeight,
    refetch,
    isFetching,
    // status,
  } = useQuery({
    queryKey: 'get-weight',
    queryFn: WeightService.getWeight,
  });

  const form = useForm({
    initialValues: {
      invoice: '',
      customer_id: customer._id,
      quantity: 0,
      product_id: '',
      due_date: new Date(),
    },
    validate: yupResolver(CreateTransactionSchema),
  });

  const { setValues, errors, values } = form;

  const selectedProduct = useMemo(() => {
    return products.find(v => v._id === values.product_id);
  }, [products, values.product_id]);

  useEffect(() => {
    if (isFetching) {
      const weight = Number(fetchWeight?.data?.weight) / 1000;
      setValues({
        quantity: weight ?? 0,
      });
    }
  }, [fetchWeight?.data?.weight, setValues, isFetching]);

  const onSubmit = form.onSubmit(values => {
    const payload = {
      ...values,
      invoice: `#${values.invoice}`,
    };

    try {
      mutateAsync(payload);
      // handleDeleteRfId();
      router.push('/transactions');
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Head>
        <title>{`Buat Transaksi Baru | ${APP_NAME}`}</title>
      </Head>
      <Container size="xs" w={'100%'} py="lg">
        <form onSubmit={onSubmit}>
          <input type="hidden" {...form.getInputProps('customer_id')} />
          <Stack align="stretch" spacing="xl">
            <Title order={3}>Buat Transaksi Baru</Title>
            <Stack>
              {/* need to make component */}
              <Text>
                Nama:{' '}
                <Text span fw="bold">
                  {customer.name}
                </Text>
              </Text>
              <Text>
                Jenis Kelamin:{' '}
                <Text span fw="bold">
                  {localeSexToId(customer.sex)}
                </Text>
              </Text>
            </Stack>
            <Stack>
              <SimpleGrid
                cols={2}
                breakpoints={[{ maxWidth: 481, cols: 1, spacing: 'sm' }]}
              >
                <TextInput
                  placeholder="Masukan kode invoice"
                  label="Kode Invoice"
                  withAsterisk
                  {...form.getInputProps('invoice')}
                />
                <Select
                  searchable
                  nothingFound="Produk Tidak Ditemukan"
                  label="Pilih Produk"
                  placeholder="Pilih produk"
                  withAsterisk
                  data={productOptions}
                  {...form.getInputProps('product_id')}
                />
              </SimpleGrid>
              <SimpleGrid
                cols={2}
                breakpoints={[{ maxWidth: 481, cols: 1, spacing: 'sm' }]}
              >
                <TextInput
                  placeholder="Kuantitas"
                  label="Kuantitas"
                  type="number"
                  withAsterisk
                  rightSectionWidth={72}
                  rightSection={
                    <Group noWrap position="right" w={64} spacing="xs">
                      {selectedProduct?.unit && (
                        <Text transform="capitalize">
                          {' '}
                          /{selectedProduct?.unit}
                        </Text>
                      )}

                      <ActionIcon
                        variant="filled"
                        color="blue"
                        onClick={() => refetch()}
                        display={
                          selectedProduct?.unit === 'pcs' ? 'none' : 'flex'
                        }
                      >
                        <IconRefresh size={18} />
                      </ActionIcon>
                    </Group>
                  }
                  {...form.getInputProps('quantity')}
                />
                <DatePicker
                  placeholder="Pilih Tanggal"
                  label="Tanggal Pengambilan"
                  withAsterisk
                  locale="id"
                  inputFormat="D MMMM YYYY"
                  allowFreeInput
                  dateParser={dateString => new Date(Date.parse(dateString))}
                  minDate={dayjs(new Date()).startOf('date').toDate()}
                  {...form.getInputProps('due_date')}
                />
              </SimpleGrid>
            </Stack>
            <Button type="submit" loading={isLoading}>
              Tambahkan
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id = '' } = context.query;
  const { data } = await RfIdService.getAvailableRfId();

  const { rfid } = data ?? {};

  if (rfid !== id) {
    return {
      redirect: {
        destination: '/transactions',
        permanent: false,
      },
    };
  }

  const { data: customer } = await CustomerService.getCustomerByRfId();
  const { data: products } = await ProductService.getAllProduct();

  return {
    props: {
      // id,
      customer,
      products,
    }, // will be passed to the page component as props
  };
};

export default CreateTransaction;
