"use client";

import { Button, Select, ActionIcon, rem, Group } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IconClock } from "@tabler/icons-react";
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
  const router = useRouter();
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const memberRef = useRef<string | null>(null);

  const [newSchedule, setNewSchedule] = useState<boolean>(false);

  // const [value, setValue] = useState<Date | null>(null);
  // const defaultDate = "2024-01-01";

  const params = useParams();
  const searchParams = useSearchParams();

  const storeId = params["storeId"] as string;
  const date = searchParams.get("date");
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
        date: date,
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

    alert("Saved");

    location.reload();
  };

  if (!memberData) return;
  return (
    <>
      {!newSchedule && (
        <Button
          fullWidth
          mt="xl"
          onClick={() => {
            setNewSchedule(true);
          }}
        >
          New Schedule
        </Button>
      )}

      {newSchedule && (
        <div className="new-schedule">
          {/* <div className="detail-title">
          <div>{storename}</div>
          <UnstyledButton
            type="button"
            onClick={() => router.push(`/store/${storeId}/schedule`)}
            variant="default"
            size="xs"
          >
            <IconX stroke={2} />
          </UnstyledButton>
        </div> */}

          <form onSubmit={insertHandler}>
            {/* <DatePickerInput
            clearable
            label="Pick date"
            placeholder="Pick date"
            // value={value}
            defaultValue={new Date()}
            onChange={setValue}
          /> */}
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

            <Group justify="center" mt="xl">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewSchedule(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </Group>
          </form>
        </div>
      )}
    </>
  );
};

export default SetDailyScheduleComponent;
