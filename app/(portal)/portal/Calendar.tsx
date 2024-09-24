"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import Container from "@/components/Common/Container";
import CalendarBody from "@/app/(portal)/portal/CalendarBody";
import CalendarHeader from "@/app/(portal)/portal/CalendarHeader";
import { Events } from "@prisma/client";

type CalendarProps = {
  events: Events[];
};

const Calendar = ({ events }: CalendarProps) => {
  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);

  return (
    <Container>
      <CalendarHeader
        today={today}
        setToday={setToday}
        currentDate={currentDate}
      />
      <CalendarBody today={today} events={events} />
    </Container>
  );
};

export default Calendar;
