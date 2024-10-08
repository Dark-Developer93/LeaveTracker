import React from "react";
import dayjs from "dayjs";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { months } from "@/lib/getDays";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

type CalendarHeaderProps = {
  today: dayjs.Dayjs;
  setToday: (date: dayjs.Dayjs) => void;
  currentDate: dayjs.Dayjs;
};

const CalendarHeader = ({
  today,
  setToday,
  currentDate,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-primary/50 py-5 px-10 rounded-t-md  dark:bg-primary/50">
      <h1 className="select-none font-semibold">
        {months[today.month()]}, {today.year()}
      </h1>
      <div className="flex gap-10 items-center ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoMdArrowDropleft
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <button
          type="button"
          className="cursor-pointer hover:scale-105 transition-all text-xl font-semibold"
          onClick={() => {
            setToday(currentDate);
          }}
        >
          Today
        </button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoMdArrowDropright
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CalendarHeader;
