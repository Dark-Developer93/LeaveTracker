import prisma from "@/lib/prisma";
import { getCurrentUser } from "../session";

export async function getAllUsers() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }
  try {
    const usersData = await prisma.user.findMany({
      orderBy: [{ name: "desc" }],
    });

    return [...usersData];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching all users:", error);
    throw new Error("Error fetching all users");
  }
}
