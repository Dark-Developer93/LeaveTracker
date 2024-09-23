import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LeaveStatusEmailProps {
  userName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
}

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

export const LeaveStatusEmail = ({
  userName,
  leaveType,
  startDate,
  endDate,
  status,
}: LeaveStatusEmailProps) => (
  <Html>
    <Head />
    <Preview>Leave Request {status}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Leave Request {status}</Heading>
        <Text style={text}>Hello {userName},</Text>
        <Text style={text}>
          Your leave request has been {status.toLowerCase()}:
        </Text>
        <Text style={text}>
          Leave Type: {leaveType}
          <br />
          Start Date: {startDate}
          <br />
          End Date: {endDate}
        </Text>
        <Text style={text}>If you have any questions, please contact HR.</Text>
      </Container>
    </Body>
  </Html>
);
