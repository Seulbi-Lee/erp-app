"use client";

import { UnstyledButton, Button, Select, ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useParams, useRouter } from "next/navigation";
import { IconClock, IconX } from "@tabler/icons-react";
import { FormEvent, useRef, useState } from "react";
import { DatePickerInput } from "@mantine/dates";

const SetDailyScheduleComponent = ({
  storeData,
  memberData,
}: {
  storeData: { storename: string }[];
  memberData:
    | { user_id: string; users: { username: string | null } | null }[]
    | null
    | any[];
}) => {
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const memberRef = useRef<string | null>(null);
  const [value, setValue] = useState<Date | null>(null);

  const params = useParams();
  const router = useRouter();

  const storeId = params["storeId"] as string;
  const storename = storeData[0].storename;

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

  const insertHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !startTimeRef.current?.value ||
      !endTimeRef.current?.value ||
      !memberRef.current
    )
      return;

    const memberId = memberRef.current;
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;

    // zod 쓰기
    const res = await fetch("/api/setDailySchedule", {
      method: "POST",
      body: JSON.stringify({
        // date: date,
        storeId: storeId,
        storename: storename,
        memberId: memberId,
        startTime: startTime,
        endTime: endTime,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    console.log(data);

    alert("Saved");
  };

  const defaultDate = "2024-01-01";

  if (!memberData) return;
  return (
    <>
      <div className="container-inner">
        <div className="detail-title">
          <div>{storename}</div>
          <UnstyledButton
            type="button"
            onClick={() => router.push(`/store/${storeId}/schedule`)}
            variant="default"
            size="xs"
          >
            <IconX stroke={2} />
          </UnstyledButton>
        </div>

        <form onSubmit={insertHandler}>
          <DatePickerInput
            clearable
            label="Pick date"
            placeholder="Pick date"
            // value={value}
            defaultValue={new Date()}
            onChange={setValue}
          />
          <Select
            label="Select Employee"
            placeholder="Select Employee"
            data={memberData.map((member, index) => {
              return {
                value: member.user_id,
                label: member.users?.username,
                index: index,
              };
            })}
            defaultValue={memberData[0].users?.username}
            onChange={(_val) => (memberRef.current = _val)}
            allowDeselect={false}
            mt="sm"
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
          <Button mt="xl" type="submit" fullWidth>
            + add
          </Button>
        </form>
      </div>
    </>
  );
};

export default SetDailyScheduleComponent;
