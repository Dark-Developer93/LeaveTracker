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
