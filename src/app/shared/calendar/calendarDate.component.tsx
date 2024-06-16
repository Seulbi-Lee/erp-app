"use Client";
import { FC, PropsWithChildren } from "react";
import { DateTime } from "luxon";
import { useParams, useRouter } from "next/navigation";
import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { NumberFormatter } from "@mantine/core";

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
    route.push(`dailySchedule?date=${date}`);
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
            data: {
              date: string;
              start: string;
              amounts: number;
              color: string;
            },
            index: number
          ) => {
            if (date === data.date) {
              return (
                <div
                  key={index}
                  className="daily-schedule"
                  style={{
                    borderLeft: 4,
                    borderStyle: "solid",
                    borderColor: data.color,
                  }}
                >
                  <p>{DateTime.fromISO(data.start).toFormat("HH:mm")}</p>
                  <NumberFormatter
                    className="strong"
                    prefix="$"
                    thousandSeparator
                    value={data.amounts}
                    decimalScale={2}
                  />
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
