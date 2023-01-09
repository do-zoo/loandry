import { Box, Container } from "@mantine/core";
import React from "react";
import { HeaderMegaMenu } from "../components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <HeaderMegaMenu />
      <Container py="md">{children}</Container>
    </Box>
  );
}

export default Layout;
