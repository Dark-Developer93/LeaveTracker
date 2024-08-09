"use server";

import { getCurrentUser } from "../../lib/session";
import { differenceInDays, parseISO } from "date-fns";
import prisma from "../../lib/prisma";

type SubmittedLeave = {
  notes: string;
  leave: string;
  startDate: string;
  endDate: string;
  user: {
    email: string;
    image: string;
    name: string;
    role: string;
  };
};

const submitLeave = async (formData: SubmittedLeave) => {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    throw new Error("User not authenticated");
  }

  const { startDate, endDate, leave, notes, user } = formData;

  const startDateObj = parseISO(startDate);
  const endDateObj = parseISO(endDate);
  const calculatedLeaveDays = differenceInDays(endDateObj, startDateObj) + 1;

  const existingLeave = await prisma.leave.findFirst({
    where: {
      startDate,
      endDate,
      userEmail: user.email,
    },
  });

  if (existingLeave) {
    throw new Error("Leave already exists for this date range.");
  }

  const year = new Date().getFullYear().toString();
  await prisma.leave.create({
    data: {
      startDate,
      endDate,
      userEmail: user.email,
      type: leave,
      userNote: notes,
      userName: user.name,
      days: calculatedLeaveDays,
      year,
    },
  });

  return { success: "Leave submitted successfully." };
};

export default submitLeave;
