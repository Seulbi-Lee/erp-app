"use client";

import { useState } from "react";
import { CalendarHeaderComponent } from "./calendarHeader.component";
import styles from "./calendar.style.module.scss";
import { DateTime } from "luxon";
import CalendarMonthComponent from "./calendarMonth.component";

const CalendarComponent = () => {
  const [year, setYear] = useState<number>(DateTime.now().year);
  const [month, setMonth] = useState<number>(DateTime.now().month);

  const goToRelativeMonth = (months: number) => {
    months = Math.floor(months);
    if (months === 0) return;

    const newDate = DateTime.local(year, month).plus({ months: months });
    setYear(newDate.year);
    setMonth(newDate.month);
  };

  return(
    <>
      <div className={styles.calendar}>
        <section className="header-section">
          <CalendarHeaderComponent
            year={year}
            month={month}
            goToRelativeMonth={goToRelativeMonth}
          />
        </section>

        <section className="calendar-section">
          <div className="day-row">
            <div className="day">Sun</div>
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
          </div>

          <CalendarMonthComponent year={year} month={month} />
        </section>
      </div>
    </>
  )
}

export default CalendarComponent;