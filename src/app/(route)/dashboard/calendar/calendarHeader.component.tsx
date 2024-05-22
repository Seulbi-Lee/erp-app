import { FC, PropsWithChildren } from "react";
import { DateTime } from "luxon";
import { Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";


type CalendarHeaderProps = {
  year: number;
  month: number;
  goToRelativeMonth: (months: number) => void;
};

export const CalendarHeaderComponent: FC<PropsWithChildren<CalendarHeaderProps>> = ({
  year,
  month,
  goToRelativeMonth,
}) => {
  return (
    <>
      <div className="year-display">
        {DateTime.local(year).toFormat("yyyy")}
      </div>
      <div className="month-display">
        {DateTime.local(year, month).toFormat("MMM")}
      </div>
      <Button onClick={() => goToRelativeMonth(-1)} variant="default" size="xs">
        <IconChevronLeft stroke={2} size="16px"/>
      </Button>
      <Button onClick={() => goToRelativeMonth(1)} variant="default" size="xs">
        <IconChevronRight stroke={2} size="16px"/>
      </Button>
    </>
  );
};

export const CalendarHeader = CalendarHeaderComponent;
