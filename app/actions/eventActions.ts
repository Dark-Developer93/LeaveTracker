"use server";

import { Role } from "@prisma/client";
import prisma from "../../lib/prisma";
import { getCurrentUser } from "../../lib/session";

type SubmittedEvent = {
  title: string;
  description: string;
  startDate: string;
};

export async function createEvent(formData: FormData) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perform this action");
  }

  const rawData = Object.fromEntries(formData);
  const data: SubmittedEvent = {
    title: rawData.title as string,
    description: rawData.description as string,
    startDate: rawData.startDate as string,
  };

  await prisma.events.create({
    data: {
      startDate: data.startDate,
      title: data.title,
      description: data.description,
    },
  });

  return { message: "Event created successfully" };
}

export async function updateEvent(formData: FormData) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perform this action");
  }

  const rawData = Object.fromEntries(formData);
  const data: SubmittedEvent & { id: string } = {
    id: rawData.id as string,
    title: rawData.title as string,
    description: rawData.description as string,
    startDate: rawData.startDate as string,
  };

  await prisma.events.update({
    where: { id: data.id },
    data: {
      startDate: data.startDate,
      title: data.title,
      description: data.description,
    },
  });

  return { message: "Event updated successfully" };
}

export async function deleteEvent(formData: FormData) {
  const loggedInUser = await getCurrentUser();
  if (!["ADMIN", "MODERATOR"].includes(loggedInUser?.role as Role)) {
    throw new Error("You are not permitted to perform this action");
  }

  const id = formData.get("id") as string;

  await prisma.events.delete({
    where: { id },
  });

  return { message: "Event deleted successfully" };
}
