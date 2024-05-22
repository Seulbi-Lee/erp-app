"use Client";

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
  const [todoList, setTodoList] = useState<string[]>(() =>
    getTodoForDate(dateTime)
  );
  const route = useRouter();

  const dailyScheduleHandler = () => {
    route.push("/dashboard/dailySchedule");
  }

  return (
    <>
      <div
        className={cx("date", isCurrMonth ? "" : "out-month")}
        onClick={dailyScheduleHandler}
      >
        {dateTime.day}
        {todoList.map((todo, index) => {
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

function cx(...classnames: string[]): string {
  return [...classnames].filter(Boolean).join(" ");
}

const TODO_STORAGE_KEY = "todoData";
const makeDateKey = (dateTime: DateTime): string => dateTime.toFormat("yyyy-MM-dd");

const getTodoForDate = (dateTime: DateTime): string[] => {
  try {
    const TodoStorageStr = localStorage.getItem(TODO_STORAGE_KEY);
    if(!TodoStorageStr) {
      return [];
    }

    const todoData = JSON.parse(TodoStorageStr) as Record<string, string[]>;
    return todoData[makeDateKey(dateTime)] || [];
  } catch (e) {
    return [];
  }
}