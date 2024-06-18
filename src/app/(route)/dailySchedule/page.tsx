import "server-only";

import styles from "@/app/main.module.scss";
import DailyScheduleComponent from "@/app/shared/dailySchedule/dailyScheduleComponent";

const DailySchedulePage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className="container-inner">
          <DailyScheduleComponent />
        </div>
      </div>
    </>
  );
};

export default DailySchedulePage;
