import { getDailySchedule } from "@/app/api/getDailySchedule";
import CalendarComponent from "../../../../shared/calendar/CalendarComponent";
import NavComponent from "../../navComponent";

const StoreScheduleComponent = async () => {
  const dailySchedule = await getDailySchedule();

  return (
    <>
      <div className="schedule">
        <div className="content">
          <CalendarComponent dailySchedule={dailySchedule} />
        </div>

        <div className="fixed-bottom">
          <div className="pay-amount">
            <span>$ 0.00</span>
          </div>

          <NavComponent />
        </div>
      </div>
    </>
  );
};

export default StoreScheduleComponent;
