import CalendarComponent from "../../calendar/CalendarComponent";
import NavComponent from "../navComponent";

const StoreScheduleComponent = async () => {
  return (
    <>
      <div className="schedule">
        <div className="content">
          <CalendarComponent />
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
