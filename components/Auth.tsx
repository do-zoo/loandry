import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export function Auth({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return <div>{children}</div>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
