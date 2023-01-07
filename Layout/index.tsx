import React from "react";
import { HeaderMegaMenu } from "../components/Navbar";
import { useSession } from "next-auth/react";
import { Box } from "@mantine/core";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderMegaMenu />
      {children}
    </div>
  );
}

export default Layout;
