"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { Button, Popover, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconX } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const DailyScheduleComponent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const params = useParams();
  const storeId = params["storeId"] as string;

  const { store: scheduleData } = useScheduleContext();

  const itemEditHandler = () => {};

  // delete item
  const itemDeleteHandler = async (itemId: string) => {
    if (confirm("Are you sure you want to delete?") === true) {
      const res = await fetch("/api/deleteSchedule", {
        method: "POST",
        body: JSON.stringify(itemId),
      });

      if (!res.ok) {
        console.log(res.statusText);
      }

      const data = await res.json();

      alert(data);

      location.reload();
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="detail-title">
        <div>{date}</div>
        <UnstyledButton
          type="button"
          onClick={() => router.back()}
          variant="default"
          size="xs"
        >
          <IconX stroke={2} />
        </UnstyledButton>
      </div>

      <div className="detail-content">
        {scheduleData.map(
          (
            data: {
              date: string;
              id: string;
              start: string;
              end: string;
              amounts: string;
              storename: string;
            },
            index: number
          ) => {
            if (data.date === date) {
              return (
                <div className="detail-item" key={data.id}>
                  <div className="store-name">{data.storename}</div>
                  <div>
                    <div className="working-time">
                      {DateTime.fromISO(data.start).toFormat("hh:mm a")} ~{" "}
                      {DateTime.fromISO(data.end).toFormat("hh:mm a")}
                    </div>
                    <div className="amounts">$ {data.amounts}</div>
                    <div className="working-hour">
                      {DateTime.fromISO(data.end)
                        .diff(DateTime.fromISO(data.start), ["hours", "minute"])
                        .toFormat("hh' hours' mm' minutes'")}
                    </div>
                  </div>
                  <div className="popover">
                    <Popover width={100} position="bottom" shadow="md">
                      <Popover.Target>
                        <Button
                          type="button"
                          variant="transparent"
                          className="more-btn"
                        >
                          <IconDotsVertical stroke={1} />
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown className="stock-popover-dropdown">
                        <Button
                          type="button"
                          variant="transparent"
                          size="sm"
                          onClick={itemEditHandler}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="transparent"
                          size="sm"
                          onClick={() => itemDeleteHandler(data.id)}
                        >
                          Delete
                        </Button>
                      </Popover.Dropdown>
                    </Popover>
                  </div>
                </div>
              );
            }
          }
        )}
      </div>
    </>
  );
};

export default DailyScheduleComponent;
