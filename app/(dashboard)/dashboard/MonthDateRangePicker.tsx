"use client";

import * as React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { format, addMonths, startOfMonth, endOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function MonthDateRangePicker() {
  const currentMonth = new Date();
  const lastMonth = addMonths(currentMonth, -1);

  const startDate = startOfMonth(lastMonth);
  const endDate = endOfMonth(currentMonth);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  const formatDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) return <span>Pick a date</span>;
    if (!dateRange.to) return format(dateRange.from, "LLL dd, y");
    return (
      <>
        {format(dateRange.from, "LLL dd, y")} -{" "}
        {format(dateRange.to, "LLL dd, y")}
      </>
    );
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <IoCalendarOutline className="mr-2 h-4 w-4" />
            {formatDateRange(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
