"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { useEffect, useRef } from "react";

const AmountComponent = () => {
  const { store: scheduleData } = useScheduleContext();
  const amountsRef = useRef<number>(0);

  if (!scheduleData) {
    amountsRef.current = 0;
  }

  useEffect(() => {
    amountsRef.current = 0;

    scheduleData.map((data: { amounts: number }) => {
      console.log(amountsRef.current, data.amounts);
      amountsRef.current = amountsRef.current + data.amounts;
    });
  }, [scheduleData]);

  return (
    <>
      <div className="pay-amount">
        <span>$ {amountsRef.current.toFixed(2)}</span>
      </div>
    </>
  );
};

export default AmountComponent;
