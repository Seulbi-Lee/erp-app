"use client";
import ScheduleProvider from "@/app/contexts/schedule.provider";
import CalendarComponent from "./CalendarComponent";

const CalendarRoot = () => {
  return (
    <>
      <ScheduleProvider>
        <CalendarComponent />
      </ScheduleProvider>
    </>
  );
};

export default CalendarRoot;
