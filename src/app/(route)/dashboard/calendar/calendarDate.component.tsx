import { FC, PropsWithChildren, useState } from "react";
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
  const [schedule, setSchedule] = useState<string[] | null>(null);

  const route = useRouter();
  const date = dateTime.toFormat("yyyy-MM-dd");

  const dailyScheduleHandler = () => {
    route.push("/dashboard/dailySchedule?date=" + date);
  };

  return (
    <>
      <div
        className={"date" + isCurrMonth ? "" : " out-month"}
        onClick={dailyScheduleHandler}
      >
        {dateTime.day}
        {schedule?.map((todo, index) => {
          return (
            <div key={index}>
              <span>{todo}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarDateComponent;
