"use client";
import { DateTime } from "luxon";
import { useParams } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const year = DateTime.now().year;
const month = DateTime.now().month;

const scheduleContext = createContext<any>({ undefined });

export const useScheduleContext = () => {
  const context = useContext(scheduleContext);
  if (context === undefined) {
    throw new Error(
      "useScheduleContext must be used within a scheduleProvider"
    );
  }
  return context;
};

const ScheduleProvider: FC<PropsWithChildren> = ({ children }) => {
  const params = useParams();
  const storeId = params["storeId"] as string;

  const [store, action] = useState([]);

  const refresh = (
    _year: number,
    _month: number,
    _storeId: string | undefined
  ) => {
    fetch("/api/getDailySchedule", {
      method: "post",
      body: JSON.stringify({
        monthData: { year: _year, month: _month },
        storeId: _storeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        action(data);
      });
  };

  useEffect(() => {
    refresh(year, month, storeId);
  }, [storeId]);

  return (
    <>
      <scheduleContext.Provider value={{ store, refresh }}>
        {children}
      </scheduleContext.Provider>
    </>
  );
};

export default ScheduleProvider;
