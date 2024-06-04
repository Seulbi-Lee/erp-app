"use Client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useScheduleStore } from "@/app/contexts/schedule.provider";

type CalendarDateProps = {
  dateTime: DateTime;
  isCurrMonth: boolean;
  schedule: any[];
};

const CalendarDateComponent: FC<PropsWithChildren<CalendarDateProps>> = ({
  dateTime,
  isCurrMonth,
  schedule,
}) => {
  const [dailySchedule, setDailySchedule] = useState<any[] | null>(schedule);

  console.log(schedule?.[0]);

  useEffect(() => {
    setDailySchedule(schedule);
  }, [schedule]);

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
        {schedule?.map((data, index) => {
          if (date === data.date) {
            return (
              <div key={index}>
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
