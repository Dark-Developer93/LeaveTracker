import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

const getRedirectUri = () => {
  if (process.env.VERCEL_ENV === "production") {
    return `${process.env.VERCEL_URL}/api/auth/callback/google`;
  }
  if (process.env.VERCEL_ENV === "preview") {
    return `${process.env.VERCEL_BRANCH_URL}/api/auth/callback/google`;
  }
  return "http://localhost:3000/api/auth/callback/google";
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: getRedirectUri(),
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email?.endsWith(process.env.ALLOWED_DOMAIN as string)) {
        throw new Error("You are not allowed to access this platform");
      }
      return true;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        return { ...token, role: user.role };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: session.user ? { ...session.user, role: token.role } : undefined,
      };
    },
  },
};
