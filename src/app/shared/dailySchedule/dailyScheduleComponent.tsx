"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { Button, UnstyledButton } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const DailyScheduleComponent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const params = useParams();
  const storeId = params["storeId"] as string;

  const { store: scheduleData } = useScheduleContext();

  return (
    <>
      <div className="container-inner">
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
                stores: { storename: string };
              },
              index: number
            ) => {
              if (data.date === date) {
                return (
                  <div className="detail-item" key={data.id}>
                    <div className="store-name">{data.stores.storename}</div>
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
                );
              }
            }
          )}
        </div>

        {storeId && (
          <Link href={"setDailySchedule"}>
            <Button fullWidth mt="xl">
              + Add
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default DailyScheduleComponent;
