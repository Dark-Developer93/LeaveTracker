"use server";

import prisma from "../../lib/prisma";
import { getCurrentUser } from "../../lib/session";
import { Role } from "@prisma/client";

type SubmittedCredits = {
  annual: number;
  family: number;
  sick: number;
  study: number;
  maternity: number;
  paternity: number;
  email: string;
  year: string;
  name: string;
};

const allowedRoles = ["ADMIN", "MODERATOR"];

export async function addCredits(formData: FormData) {
  const loggedInUser = await getCurrentUser();
  if (!allowedRoles.includes(loggedInUser?.role as Role)) {
    throw new Error("You are not permitted to perform this action");
  }

  const rawData = Object.fromEntries(formData);
  const data: SubmittedCredits = {
    annual: Number(rawData.annual),
    family: Number(rawData.family),
    sick: Number(rawData.sick),
    study: Number(rawData.study),
    maternity: Number(rawData.maternity),
    paternity: Number(rawData.paternity),
    email: rawData.email as string,
    year: rawData.year as string,
    name: rawData.name as string,
  };

  const existingCredits = await prisma.balances.findFirst({
    where: {
      year: data.year,
      email: data.email,
    },
  });

  if (existingCredits) {
    throw new Error(`Credits for ${data.year} already exist`);
  }

  await prisma.balances.create({
    data: {
      name: data.name,
      email: data.email,
      year: data.year,
      annualCredit: data.annual,
      familyCredit: data.family,
      sickCredit: data.sick,
      studyCredit: data.study,
      maternityCredit: data.maternity,
      paternityCredit: data.paternity,
    },
  });

  return { message: "Success" };
}
