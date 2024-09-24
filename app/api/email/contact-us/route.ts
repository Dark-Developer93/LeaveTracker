import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { ContactFormEmail } from "@/emails/ContactFormEmail";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const emailComponent = ContactFormEmail({ name, email, message });
    const data = await sendEmail(
      "hello@wemaad.com",
      "New Contact Form Submission",
      emailComponent,
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
