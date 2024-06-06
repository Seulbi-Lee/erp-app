"use Client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useScheduleContext } from "@/app/contexts/schedule.provider";

type CalendarDateProps = {
  dateTime: DateTime;
  isCurrMonth: boolean;
};

const CalendarDateComponent: FC<PropsWithChildren<CalendarDateProps>> = ({
  dateTime,
  isCurrMonth,
}) => {
  const { store: scheduleData } = useScheduleContext();

  const route = useRouter();
  const date = dateTime.toFormat("yyyy-MM-dd");

  const dailyScheduleHandler = () => {
    route.push("/dailySchedule?date=" + date);
  };

  return (
    <>
      <div
        className={isCurrMonth ? "date" : "date out-month"}
        onClick={dailyScheduleHandler}
      >
        {dateTime.day}
        {scheduleData?.map((data: any, index: number) => {
          if (date === data.date) {
            return (
              <div key={index} className="daily-schedule">
                <span>
                  {data.start.slice(0, 5)} ~ {data.end.slice(0, 5)}
                </span>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default CalendarDateComponent;
