import { FC, PropsWithChildren, ReactNode } from "react";
import { DateTime } from "luxon";
import CalendarDateComponent from "./calendarDate.component";

type CalendarMonthProps = {
  year: number;
  month: number;
};

const CalendarMonthComponent: FC<PropsWithChildren<CalendarMonthProps>> = ({
  year,
  month,
}) => {
  return (
    <>
      {makeWeekRows(year, month).map((weekRow, week) => (
        <div key={week} className="week-row">
          {weekRow}
        </div>
      ))}
    </>
  );
};

export default CalendarMonthComponent;

function makeWeekRows(year: number, month: number): ReactNode[][] {
  const day1 = DateTime.local(year, month, 1).weekday;
  let date = DateTime.local(year, month, 1).minus({
    days: day1 === 7 ? 0 : day1,
  });

  const weekRows: ReactNode[][] = [];
  let week = 0;
  do {
    weekRows[week] = [];
    for (let i = 0; i < 7; i++) {
      weekRows[week].push(
        <CalendarDateComponent
          key={date.day}
          dateTime={date}
          isCurrMonth={date.month === month}
        />
      );
      date = date.plus({ day: 1 });
    }
    week++;
  } while (date.month === month);

  return weekRows;
}
