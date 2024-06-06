"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { useEffect, useState } from "react";

const AmountComponent = () => {
  const { store: scheduleData } = useScheduleContext();
  const [amount, setAmounts] = useState<number>(0);

  useEffect(() => {
    let tempAmount = 0;
    scheduleData.map((data: { amounts: number }) => {
      tempAmount = tempAmount + data.amounts;
    });
    setAmounts(tempAmount);
  }, [scheduleData])

  return (
    <>
      <div className="pay-amount">
        <span>$ {amount.toFixed(2)}</span>
      </div>
    </>
  );
};

export default AmountComponent;
