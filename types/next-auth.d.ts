import "next-auth";
import "next-auth/jwt";
import { GetUserResponse } from "../services/auth.service";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    accessToken?: string | null;
    accessTokenExpires?: number | null;
    refreshTokenExpires?: number | null;
    tokenType?: string | null;
    user?: GetUserResponse["data"] | null;
    error?: string | Record<string, unknown> | null;
    logoutReason?: string | Record<string, unknown> | null;
  }

  interface User {
    _id: string;
    email: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    [key: string]: any;
  }
}
