import { CardProduct } from '@/components/Card';
import { ModalProduct } from '@/components/Modals';
import { useAppDispatch } from '@/hooks/redux';
import { ProductService } from '@/services/product.services';
import { setModalProduct } from '@/stores/features/modal/modal.slice';
import { IProduct } from '@/types/res';
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Title,
} from '@mantine/core';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APP_NAME } from '../variables';
import { authOptions } from './api/auth/[...nextauth]';

interface IProps {
  products: IProduct[];
}

function Home() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: productsApi, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getAllProduct,
  });

  const products = useMemo(
    () =>
      productsApi?.data && Array.isArray(productsApi.data)
        ? productsApi.data
        : [],
    [productsApi?.data]
  );

  const { mutateAsync } = useMutation({
    mutationFn: ProductService.deleteProduct,
    onSuccess() {
      queryClient.invalidateQueries(['products']);
    },
  });

  const handleCreateProduct = () => {
    dispatch(
      setModalProduct({
        visibility: true,
      })
    );
  };

  const handleUpdateProduct = (data: IProduct) => {
    dispatch(
      setModalProduct({
        data: {
          type: 'update-product',
          defaultValues: {
            ...data,
          },
        },
        visibility: true,
      })
    );
  };

  const handleDelete = (id: string) => {
    try {
      mutateAsync(id);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{`Produk | ${APP_NAME}`}</title>
      </Head>
      <Stack spacing="lg">
        <Group align="center" position="apart">
          <Title order={3}>Daftar produk</Title>
          <Button onClick={handleCreateProduct}>Tambah Produk</Button>
        </Group>
        {products?.length > 0 ? (
          <Grid>
            {products?.map(v => (
              <Grid.Col span={6} sm={4} md={3} key={v._id}>
                <CardProduct
                  product={v}
                  onDelete={handleDelete}
                  onUpdate={handleUpdateProduct}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Box>Belum ada produk</Box>
        )}
      </Stack>
      <ModalProduct />
      <LoadingOverlay visible={isFetching} overlayBlur={10} mih="100vh" />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Home;
