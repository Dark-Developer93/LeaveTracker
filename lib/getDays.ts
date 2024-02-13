import dayjs from "dayjs";

// export const getDays = (month = dayjs().month(), year = dayjs().year()) => {
//   const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
//   const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");

//   const days = [];

//   // get previous days

//   for (let i = 0; i < firstDayOfMonth.day(); i++) {
//     days.push({ date: firstDayOfMonth.day(i), currentMonth: false });
//   }

//   // get current month days
//   for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
//     const currentDate = firstDayOfMonth.date(i);
//     days.push({
//       currentMonth: true,
//       date: currentDate,
//       today:
//         currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
//     });
//   }

//   // get forward days

//   const TOTAL_DAY_SLOTS_IN_CALENDAR_VIEW = 42;
//   const forwardDays = TOTAL_DAY_SLOTS_IN_CALENDAR_VIEW - days.length;
//   for (
//     let i = lastDayOfMonth.date() + 1;
//     i <= lastDayOfMonth.date() + forwardDays;
//     i++
//   ) {
//     days.push({ date: lastDayOfMonth.date(i), currentMonth: false });
//   }
// };

export const getDays = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");

  const days = Array.from({ length: lastDayOfMonth.date() }, (_, i) => {
    const currentDate = firstDayOfMonth.date(i + 1);
    return {
      currentMonth: true,
      date: currentDate,
      today: isToday(currentDate),
    };
  });

  const previousDays = Array.from({ length: firstDayOfMonth.day() }, (_, i) => {
    const previousDate = firstDayOfMonth.subtract(i + 1, "day");
    return {
      currentMonth: false,
      date: previousDate,
    };
  });

  const TOTAL_DAY_SLOTS_IN_CALENDAR_VIEW = 42;
  const forwardDays = Array.from(
    {
      length:
        TOTAL_DAY_SLOTS_IN_CALENDAR_VIEW - days.length - previousDays.length,
    },
    (_, i) => {
      const forwardDate = lastDayOfMonth.add(i + 1, "day");
      return {
        currentMonth: false,
        date: forwardDate,
      };
    }
  );

  return [...previousDays, ...days, ...forwardDays];
};

const isToday = (date: dayjs.Dayjs) => {
  return date.toDate().toDateString() === dayjs().toDate().toDateString();
};

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
