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
};

export async function updateUser(formData: FormData) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perform this action");
  }

  const rawData = Object.fromEntries(formData);
  const data: EditUserData = {
    id: rawData.id as string,
    phone: rawData.phone as string,
    department: rawData.department as string,
    role: rawData.role as Role,
    title: rawData.title as string,
  };

  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      phone: data.phone,
      department: data.department,
      role: data.role,
      title: data.title,
    },
  });

  return { message: "User updated successfully" };
}
