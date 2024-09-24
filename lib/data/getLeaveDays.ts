import prisma from "@/lib/prisma";
import { getCurrentUser } from "../session";
import { Role } from "@prisma/client";

const allowedRoles = ["ADMIN", "MODERATOR", "SUPERVISOR"];

export async function getAllLeaveDays() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAuthorized = allowedRoles.includes(loggedInUser.role as Role);

  if (!isAuthorized) {
    return [];
  }
  try {
    const leaves = await prisma.leave.findMany({
      orderBy: [{ createdAt: "desc" }],
    });

    return [...leaves];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching all leave days:", error);
    throw new Error("Error fetching all leave days");
  }
}

export async function getUserLeaveDays() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  try {
    const userEmail = loggedInUser.email as string;
    const leaves = await prisma.leave.findMany({
      where: {
        userEmail,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    return [...leaves];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching user leave days:", error);
    throw new Error("Error fetching user leave days");
  }
}
