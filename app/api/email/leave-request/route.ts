import { NextResponse } from "next/server";
import { sendEmail, generateLeaveRequestEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { userName, leaveType, startDate, endDate } = await req.json();
    const emailComponent = generateLeaveRequestEmail(
      userName,
      leaveType,
      startDate,
      endDate,
    );
    const data = await sendEmail(
      "hello@wemaad.com", // Replace with actual supervisor email
      "New Leave Request",
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
