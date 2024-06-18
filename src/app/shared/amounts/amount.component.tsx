"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { NumberFormatter } from "@mantine/core";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AmountComponent = () => {
  const { store: scheduleData } = useScheduleContext();
  const [amount, setAmounts] = useState<number>(0);
  const pathname = usePathname();
  const params = useParams();
  const storeId = params["storeId"];

  useEffect(() => {
    let tempAmount = 0;
    scheduleData.map((data: { amounts: number }) => {
      tempAmount = tempAmount + data.amounts;
    });
    setAmounts(tempAmount);
  }, [scheduleData]);

  if (storeId && pathname !== `/store/${storeId}/schedule`) return;

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
