import { NextResponse } from "next/server";
import { sendEmail, generateLeaveStatusEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { userName, leaveType, startDate, endDate, status, email } =
      await req.json();
    const emailComponent = generateLeaveStatusEmail(
      userName,
      leaveType,
      startDate,
      endDate,
      status,
    );
    const data = await sendEmail(
      email,
      `Leave Request ${status}`,
      emailComponent,
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `An Unexpected error occurred: ${error}` },
      { status: 500 },
    );
  }
}
