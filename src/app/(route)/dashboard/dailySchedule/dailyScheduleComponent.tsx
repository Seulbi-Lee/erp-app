"use client";

import { UnstyledButton, Button, Select, ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import styles from "@/app/(route)/dashboard/dashboard.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { IconClock, IconX } from "@tabler/icons-react";
import { FC, PropsWithChildren, useRef } from "react";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";

const DailyScheduleComponent: FC<PropsWithChildren> = ({}: {}) => {
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const route = useRouter();

  const date = searchParams.get("date");

  const startTimePicker = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => startTimeRef.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const endTimePicker = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => endTimeRef.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <>
      <div className="container-inner">
        <div className="detail-title">
          <div>{date}</div>
          <UnstyledButton
            type="button"
            onClick={() => route.back()}
            variant="default"
            size="xs"
          >
            <IconX stroke={2} />
          </UnstyledButton>
        </div>
        <form>
          <Select
            placeholder="Select Store"
            data={["store1", "store2"]}
            defaultValue="store1"
            allowDeselect={false}
          />
          <Select
            placeholder="Select Employee"
            data={["p1", "p2", "p3", "p4"]}
            defaultValue="p1"
            allowDeselect={false}
            mt="md"
          />
          <TimeInput
            label="Start"
            ref={startTimeRef}
            rightSection={startTimePicker}
            mt="sm"
          />
          <TimeInput
            label="End"
            ref={endTimeRef}
            rightSection={endTimePicker}
            mt="sm"
          />
          <Button mt="md" fullWidth>
            + add
          </Button>
        </form>
      </div>
    </>
  );
};

export default DailyScheduleComponent;
