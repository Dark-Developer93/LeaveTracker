import React from "react";
import dayjs from "dayjs";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { months } from "@/lib/getDays";

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
    <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-100 py-5 px-10 rounded-t-md  dark:bg-slate-900">
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
        <h1
          className=" cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setToday(currentDate);
          }}
        >
          Today
        </h1>
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
