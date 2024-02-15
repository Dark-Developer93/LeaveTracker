import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type EditUserBody = {
  phone: string;
  department: string;
  role: Role;
  title: string;
  id: string;
};

export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perform this action");
  }

  try {
    const body: EditUserBody = await req.json();

    const { phone, department, id, role, title } = body;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        phone,
        department,
        role,
        title,
      },
    });

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
