import axios from "axios";
import { randomBytes, randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const { data } = await axios.post("http://localhost:3000/api/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          return data.data;
        } catch (e: any) {
          const errorMessage = e.response.data.message;
          if (e instanceof Error) {
            throw new Error(errorMessage);
          }
          return {
            message: e,
          };
          // Redirecting to the login page with error message          in the URL
        }

        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Credentials
      if (account?.type === "credentials" && user) {
        return true;
      }
      return false;
    },

    // async jwt({ token, user, account }) {
    //   if (account && user) {
    //     console.log(user);
    //     return {
    //       ...token,
    //       accessToken: user?.token,
    //       refreshToken: user?.refreshToken,
    //     };
    //   }

    //   return token;
    // },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return { ...session, ...user };
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  secret: process.env.JWT_SECRET,

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/", // (used for check email message)
    newUser: "/", // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  debug: process.env.NODE_ENV === "development",
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
