"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { NumberFormatter } from "@mantine/core";
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
  }, [scheduleData]);

  return (
    <>
      <div className="pay-amount">
        <NumberFormatter
          prefix="$ "
          thousandSeparator
          value={amount.toFixed(2)}
          decimalScale={2}
        />
      </div>
    </>
  );
};

export default AmountComponent;
