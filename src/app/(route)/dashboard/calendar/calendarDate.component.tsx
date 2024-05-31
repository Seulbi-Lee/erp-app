"use Client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";

type CalendarDateProps = {
  dateTime: DateTime;
  isCurrMonth: boolean;
};

const CalendarDateComponent: FC<PropsWithChildren<CalendarDateProps>> = ({
  dateTime,
  isCurrMonth,
}) => {
  const [schedule, setSchedule] = useState<any[] | null>(null);

  const route = useRouter();
  const date = dateTime.toFormat("yyyy-MM-dd");

  const dailyScheduleHandler = () => {
    route.push("/dashboard/dailySchedule?date=" + date);
  };

  return (
    <>
      <div
        className={isCurrMonth ? "date" : "date out-month"}
        onClick={dailyScheduleHandler}
      >
        {dateTime.day}
        {schedule?.map((data, index) => {
          return (
            <div key={index}>
              <span>{data}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarDateComponent;
