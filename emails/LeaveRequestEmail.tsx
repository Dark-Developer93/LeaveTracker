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

interface LeaveRequestEmailProps {
  userName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
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

export const LeaveRequestEmail = ({
  userName,
  leaveType,
  startDate,
  endDate,
}: LeaveRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>New Leave Request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Leave Request</Heading>
        <Text style={text}>Hello,</Text>
        <Text style={text}>{userName} has submitted a new leave request:</Text>
        <Text style={text}>
          Leave Type: {leaveType}
          <br />
          Start Date: {startDate}
          <br />
          End Date: {endDate}
        </Text>
        <Text style={text}>
          Please review and approve or reject this request.
        </Text>
      </Container>
    </Body>
  </Html>
);
