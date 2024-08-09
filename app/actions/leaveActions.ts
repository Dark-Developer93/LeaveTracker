"use server";

import { getCurrentUser } from "../../lib/session";
import calculateAndUpdateBalances from "../../lib/calculateBalances";
import prisma from "../../lib/prisma";
import { LeaveStatus } from "@prisma/client";

type EditBody = {
  notes: string;
  status: LeaveStatus;
  id: string;
  days: number;
  type: string;
  year: string;
  email: string;
  user: string;
  startDate: string;
};

export async function updateLeave(formData: FormData) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN" && loggedInUser?.role !== "MODERATOR") {
    throw new Error("You are not permitted to perform this action");
  }

  const rawData = Object.fromEntries(formData);
  const data: EditBody = {
    notes: rawData.notes as string,
    status: rawData.status as LeaveStatus,
    id: rawData.id as string,
    days: Number(rawData.days),
    type: rawData.type as string,
    year: rawData.year as string,
    email: rawData.email as string,
    user: rawData.user as string,
    startDate: rawData.startDate as string,
  };
  const { notes, status, id, days, type, year, email, user, startDate } = data;

  const updatedAt = new Date().toISOString();
  const formattedStartDate = new Date(startDate).toISOString();
  const moderator = loggedInUser.name;

  try {
    if (status === LeaveStatus.APPROVED) {
      await calculateAndUpdateBalances(email, year, type, Number(days));
      await prisma.events.create({
        data: {
          startDate: formattedStartDate,
          title: `${user} on Leave`,
          description: `For ${days} days`,
        },
      });
    }

    await prisma.leave.update({
      where: { id },
      data: {
        moderatorNote: notes,
        status: status as LeaveStatus,
        updatedAt,
        moderator,
      },
    });

    return { message: "Success" };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update leave: ${error}`);
  }
}
