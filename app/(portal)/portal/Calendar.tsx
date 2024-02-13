"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import Container from "@/components/Common/Container";
import CalendarBody from "@/app/(portal)/portal/CalendarBody";
import CalendarHeader from "@/app/(portal)/portal/CalendarHeader";

const Calendar = () => {
  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);

  return (
    <Container>
      <CalendarHeader
        today={today}
        setToday={setToday}
        currentDate={currentDate}
      />
      <CalendarBody today={today} />
    </Container>
  );
};

export default Calendar;
