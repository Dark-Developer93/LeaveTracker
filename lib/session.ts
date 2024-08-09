import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}
