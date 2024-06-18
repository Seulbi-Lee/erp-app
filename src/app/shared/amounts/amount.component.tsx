"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { NumberFormatter } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AmountComponent = () => {
  const { store: scheduleData } = useScheduleContext();
  const [amount, setAmounts] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    let tempAmount = 0;
    scheduleData.map((data: { amounts: number }) => {
      tempAmount = tempAmount + data.amounts;
    });
    setAmounts(tempAmount);
  }, [scheduleData]);

  if (pathname !== "/store/8863577c-4b0d-4da0-b861-7da685b5a471/schedule")
    return;

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
