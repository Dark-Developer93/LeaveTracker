import React from "react";
import { daysOfWeek, getDays } from "@/lib/getDays";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Events } from "@prisma/client";
import EventPopOver from "./EventPopOver";

type CalendarBodyProps = {
  today: dayjs.Dayjs;
  events: Events[];
};

const CalendarBody = ({ today, events }: CalendarBodyProps) => {
  return (
    <section className="bg-white py-5 rounded-b-md dark:border dark:bg-black">
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day) => {
          return (
            <h1 key={day} className="h-10 font-bold grid place-content-center">
              {day}
            </h1>
          );
        })}
      </div>
      <div className="grid grid-cols-7">
        {getDays(today.month(), today.year()).map(
          ({ date, currentMonth, today: isToday }) => {
            const event = events?.find((e) =>
              dayjs(e.startDate).isSame(date, "day"),
            );
            return (
              <div
                key={date.toString()}
                className="h-10 grid place-content-center"
              >
                {!event ? (
                  <h1
                    className={cn(
                      !currentMonth && "text-slate-400",
                      isToday && "bg-primary text-white ",
                      "h-8 w-8 p-1 grid place-content-center font rounded-full cursor-pointer hover:bg-primary/25 hover:text-white dark:hover:bg-primary",
                    )}
                  >
                    {date.date()}
                  </h1>
                ) : (
                  <EventPopOver event={event as Events} date={date.date()} />
                )}
              </div>
            );
          },
        )}
      </div>
    </section>
  );
};

export default CalendarBody;
