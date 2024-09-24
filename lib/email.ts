import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import { LeaveRequestEmail } from "@/emails/LeaveRequestEmail";
import { LeaveStatusEmail } from "@/emails/LeaveStatusEmail";
import { ContactFormEmail } from "@/emails/ContactFormEmail";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  emailComponent: JSX.Element,
) {
  try {
    const html = render(emailComponent);
    const info = await transporter.sendMail({
      from: '"Leave Tracker" <hello@wemaad.com>',
      to,
      cc: "hr@example.com",
      subject,
      html: await html,
    });
    return { success: true, data: info };
  } catch (error) {
    return { success: false, error };
  }
}

export function generateLeaveRequestEmail(
  userName: string,
  leaveType: string,
  startDate: string,
  endDate: string,
) {
  return LeaveRequestEmail({ userName, leaveType, startDate, endDate });
}

export function generateLeaveStatusEmail(
  userName: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  status: string,
) {
  return LeaveStatusEmail({ userName, leaveType, startDate, endDate, status });
}

export function generateContactFormEmail(
  name: string,
  email: string,
  message: string,
) {
  return ContactFormEmail({ name, email, message });
}
