"use server";

import { Role } from "@prisma/client";
import prisma from "../../lib/prisma";
import { getCurrentUser } from "../../lib/session";

type EditUserData = {
  phone: string;
  department: string;
  role: Role;
  title: string;
  id: string;
  supervisors: string[];
  supervisees: string[];
};
const allowedRoles = ["SUPERVISOR", "ADMIN", "MODERATOR"];

export async function updateUser(data: EditUserData) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perform this action");
  }

  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      phone: data.phone,
      department: data.department,
      role: data.role,
      title: data.title,
      supervisors: data.supervisors,
      supervisees: data.supervisees,
    },
  });

  return { message: "User updated successfully" };
}

export async function getAllSuperviseeUsers() {
  const loggedInUser = await getCurrentUser();
  if (!allowedRoles.includes(loggedInUser?.role as Role)) {
    throw new Error("You are not permitted to perform this action");
  }

  const supervisees = await prisma.user.findMany({
    where: {
      supervisors: {
        has: loggedInUser?.email,
      },
    },
  });

  return supervisees;
}

