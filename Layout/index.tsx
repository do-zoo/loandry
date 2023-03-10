import { HeaderMegaMenu } from '@/components/Navbar';
import { Box, Container } from '@mantine/core';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
        }}
      >
        <HeaderMegaMenu />
        <Container py="md" pos="relative">
          {children}
        </Container>
      </Box>
    </>
  );
}

export default Layout;
