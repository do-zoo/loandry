import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../Layout";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "react-query";
import { useEffect } from "react";
import queryClient from "../configs/react-query";
import { Auth } from "../components/Auth";

export default function App(props: AppProps) {
  const {
    Component,
    pageProps: { session, ...pageProps },
    router,
  } = props;

  useEffect(() => {
    queryClient.setQueriesData("SESSION", session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          globalStyles: (theme) => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
            },

            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.white,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
              lineHeight: theme.lineHeight,
            },

            ".active-link": {
              color: theme.colors.blue,
            },

            // '#your-id > [data-active]': {
            //   backgroundColor: 'pink',
            // },
          }),
        }}
      >
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            {router.pathname !== "/login" ? (
              <Auth>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
