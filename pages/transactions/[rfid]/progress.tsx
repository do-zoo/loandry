import { CustomerService } from '@/services/customer.services';
import { RfIdService } from '@/services/rfid.services';
import { TransactionsService } from '@/services/transaction.services';
import { ICustomer, IProduct, ITransaction } from '@/types/res';
import { rupiah } from '@/utils/format';
import { localeSexToId } from '@/utils/index';
import { useMutation } from 'react-query';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
  customer: ICustomer;
  transactions: ITransaction[];
  products: IProduct[];
}

const getTransactionProduct = ({
  transaction,
  products,
}: {
  transaction: ITransaction;
  products: IProduct[];
}): IProduct | undefined => {
  return products.find(product => product._id === transaction.product_id);
};

function Progress(props: IProps) {
  const { customer, transactions, products } = props;

  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: TransactionsService.updateStatusTransaction,
  });

  const handleUpdateStatus = ({
    id,
    status,
  }: Record<'id' | 'status', string>) => {
    try {
      mutateAsync({ id, status });
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack py="md">
      <Stack spacing={0}>
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

      <Grid>
        {transactions.map(v => {
          const product = getTransactionProduct({
            products,
            transaction: v,
          });
          return (
            <Grid.Col span={12} md={6} key={v._id}>
              <Card shadow="md" withBorder radius="md">
                <Card.Section px="md" py="xs" withBorder>
                  <Group position="apart">
                    <Text>#{v.invoice}</Text>
                    <Text>
                      {new Date(v.due_date).toLocaleString('id-ID', {
                        dateStyle: 'long',
                      })}
                    </Text>
                  </Group>
                </Card.Section>
                <Card.Section p="md">
                  <Group align="stretch" position="apart" noWrap>
                    <Box w="150px">
                      <AspectRatio
                        pos="relative"
                        ratio={1}
                        sx={{ maxWidth: '100%' }}
                        mx="auto"
                      >
                        {product && Boolean(product.image) ? (
                          <Image src={product.image} fill alt="img-product" />
                        ) : (
                          <Image
                            src="/assets/png/placeholder-product.png"
                            fill
                            alt="alt img-product"
                          />
                        )}
                      </AspectRatio>
                    </Box>
                    <Stack
                      justify="space-between"
                      sx={{
                        flex: '1 1 auto',
                      }}
                    >
                      <Stack justify="start" spacing={0}>
                        <Text weight="bold" color="blue" size="lg">
                          {product?.name}
                        </Text>
                        <Text size="xs">
                          1000kg x {rupiah(product?.price ?? 0)}{' '}
                        </Text>
                        <Text weight="bold">
                          Total: {rupiah(v.total_amount)}
                        </Text>
                      </Stack>
                      <Group position="right">
                        <Button
                          color="green"
                          onClick={() =>
                            handleUpdateStatus({
                              id: v._id,
                              status: 'success',
                            })
                          }
                          // loading={isLoading}
                        >
                          Selesaikan
                        </Button>
                      </Group>
                    </Stack>
                  </Group>
                </Card.Section>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { rfid } = context.query;
  const {
    data: { rfid: resRfId },
  } = await RfIdService.getAvailableRfId();

  if (rfid !== resRfId) {
    return {
      redirect: {
        destination: '/transactions',
        permanent: false,
      },
    };
  }

  try {
    const {
      data: { transactions, customer, products },
      status,
    } = await CustomerService.getCustomerTransactions({
      rfid,
      params: {
        status: 'progress',
      },
    });

    if (transactions.length === 0) {
      return {
        redirect: {
          destination: '/transactions',
          permanent: false,
        },
      };
    }

    return {
      props: {
        customer,
        transactions,
        products,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/transactions',
        permanent: false,
      },
    };
  }
};

export default Progress;
