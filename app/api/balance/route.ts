import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const allowedRoles = ["ADMIN", "MODERATOR"];

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!allowedRoles.includes(loggedInUser?.role as Role)) {
    throw new Error("You are not authorized to perform this action");
  }

  try {
    console.log(req.json);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
