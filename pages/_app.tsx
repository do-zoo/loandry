import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { Auth } from "@/components/Auth";
import queryClient from "@/configs/react-query";
import Layout from "../Layout";
import { RouterTransition } from "@/components/RouterTransition";

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
            td: {
              whiteSpace: "nowrap",
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
        <RouterTransition />
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
