import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";

interface EventBody {
  [key: string]: number | string;
  id: string;
}

const allowedRoles = ["ADMIN", "MODERATOR"];

export async function PATCH(req: Request) {
  const loggedInUser = await getCurrentUser();
  if (allowedRoles.includes(loggedInUser?.role as Role)) {
    throw new Error("You are not permitted to perform this action");
  }

  try {
    const event: EventBody = await req.json();
    const { id, ...data } = event;

    await prisma.events.update({
        where: { id },
        data,
      });


    return NextResponse.json(
      { message: "Event updated/deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {

    const loggedInUser = await getCurrentUser();
  if (allowedRoles.includes(loggedInUser?.role as Role)) {
    throw new Error("You are not permitted to perform this action");
  }

  try {
    const event: EventBody = await req.json();
    const { id } = event;

    await prisma.events.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

