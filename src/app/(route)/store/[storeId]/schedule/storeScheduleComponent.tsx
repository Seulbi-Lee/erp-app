import { getDailySchedule } from "@/app/api/getDailySchedule";
import NavComponent from "../../navComponent";
import CalendarRoot from "@/app/shared/calendar/calenderRoot";

const StoreScheduleComponent = async () => {
  return (
    <>
      <div className="schedule">
        <div className="content">
          <CalendarRoot />
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
