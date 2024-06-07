"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

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
  const [store, action] = useState([]);

  return (
    <>
      <scheduleContext.Provider value={{ store, action }}>
        {children}
      </scheduleContext.Provider>
    </>
  );
};

export default ScheduleProvider;
