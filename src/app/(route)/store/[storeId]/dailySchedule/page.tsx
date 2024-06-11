import "server-only";

import styles from "@/app/(route)/dashboard/main.module.scss";
import DailyScheduleComponent from "@/app/shared/dailySchedule/dailyScheduleComponent";

const DailySchedulePage = () => {
  return (
    <>
      <div className={styles.container}>
        <DailyScheduleComponent />
      </div>
    </>
  );
};

export default DailySchedulePage;
