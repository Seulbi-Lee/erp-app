import CalendarComponent from "@/app/shared/calendar/CalendarComponent";
import NavComponent from "../../navComponent";
import AmountComponent from "@/app/shared/amounts/amount.component";

const StoreScheduleComponent = async () => {
  return (
    <>
      <div className="schedule">
        <div className="content">
          <CalendarComponent />
        </div>

        <div className="fixed-bottom">
          <AmountComponent />
          <NavComponent />
        </div>
      </div>
    </>
  );
};

export default StoreScheduleComponent;
