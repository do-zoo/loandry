import React from "react";
import { HeaderMegaMenu } from "../components/Navbar";
import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (!session) {
    return children;
  }
  return (
    <div>
      <HeaderMegaMenu />
      {children}
    </div>
  );
}

export default Layout;
