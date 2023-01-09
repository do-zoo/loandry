import { Box, Stack, Title } from "@mantine/core";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function Home() {
  return (
    <>
      <Head>
        <title>Produk | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Stack spacing="lg">
        <Title order={3}>Daftar produk</Title>
        <Box>Daftar produk</Box>
      </Stack>
    </>
  );
}

export default Home;
