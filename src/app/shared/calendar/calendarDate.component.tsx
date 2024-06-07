"use Client";
import { FC, PropsWithChildren } from "react";
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
        {scheduleData?.map(
          (
            data: { date: string; start: string; amounts: number },
            index: number
          ) => {
            if (date === data.date) {
              return (
                <div key={index} className="daily-schedule">
                  <p>{DateTime.fromISO(data.start).toFormat("HH:mm")}</p>
                  <p>
                    <span className="strong">${data.amounts.toFixed(1)}</span>
                  </p>
                </div>
              );
            }
          }
        )}
      </div>
    </>
  );
};

export default CalendarDateComponent;
