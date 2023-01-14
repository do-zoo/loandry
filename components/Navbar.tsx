import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Header,
  ScrollArea,
  createStyles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons';
import { signOut } from 'next-auth/react';
import { Logo } from '../assets';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      textDecoration: 'none',
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme, cx } = useStyles();

  const { pathname } = useRouter();

  const onLogout = () => {
    signOut();
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
      }}
    >
      <Header height={60} px="md">
        <Container sx={{ height: '100%' }}>
          <Group position="apart" align="center" sx={{ height: '100%' }}>
            <Logo
              style={{
                height: 30,
              }}
            />

            <Group
              sx={{ height: '100%' }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Anchor
                href="/"
                className={cx(classes.link, [
                  pathname === '/' && 'active-link',
                ])}
                component={Link}
                onClick={() => {
                  closeDrawer();
                }}
              >
                Produk
              </Anchor>

              <Anchor
                href="/transactions"
                className={cx(classes.link, [
                  pathname === '/transactions' && 'active-link',
                ])}
                component={Link}
                onClick={() => {
                  closeDrawer();
                }}
              >
                Transaksi
              </Anchor>
              <Anchor
                href="/customers"
                className={cx(classes.link, [
                  pathname === '/customers' && 'active-link',
                ])}
                component={Link}
                onClick={() => {
                  closeDrawer();
                }}
              >
                Pelanggan
              </Anchor>
            </Group>

            <Group className={classes.hiddenMobile}>
              <Button
                color="red"
                variant="subtle"
                leftIcon={<IconLogout size={14} />}
                onClick={onLogout}
              >
                Keluar
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Anchor
            href="/"
            className={cx(classes.link, [pathname === '/' && 'active-link'])}
            component={Link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Produk
          </Anchor>

          <Anchor
            href="/transactions"
            className={cx(classes.link, [
              pathname === '/transactions' && 'active-link',
            ])}
            component={Link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Transaksi
          </Anchor>
          <Anchor
            href="/customers"
            className={cx(classes.link, [
              pathname === '/customers' && 'active-link',
            ])}
            component={Link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Pelanggan
          </Anchor>

          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button
              color="red"
              variant="subtle"
              leftIcon={<IconLogout size={14} />}
              onClick={onLogout}
            >
              Keluar
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
