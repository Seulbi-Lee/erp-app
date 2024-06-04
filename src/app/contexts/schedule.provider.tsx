import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const scheduleStore = createContext<any | undefined>(undefined);
const scheduleAction = createContext<any | undefined>(undefined);

export const useScheduleStore = () => {
  const context = useContext(scheduleStore);
  if (context === undefined) {
    throw new Error("useScheduleStore must be used within a scheduleProvider");
  }
  return context;
};

export const useScheduleAction = () => {
  const context = useContext(scheduleAction);
  if (context === undefined) {
    throw new Error("useScheduleAction must be used within a scheduleProvider");
  }
  return context;
};

const ScheduleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store, action] = useState([]);

  return (
    <>
      <scheduleStore.Provider value={store}>
        <scheduleAction.Provider value={action}>
          {children}
        </scheduleAction.Provider>
      </scheduleStore.Provider>
    </>
  );
};

export default ScheduleProvider;
