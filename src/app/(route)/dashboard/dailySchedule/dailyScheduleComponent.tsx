"use client";

import { UnstyledButton, Button, Select } from "@mantine/core";
import styles from "@/app/(route)/dashboard/dashboard.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { IconX } from "@tabler/icons-react";
import { FC, PropsWithChildren } from "react";

const DailyScheduleComponent: FC<PropsWithChildren> = ({
  
}: {

}) => {
  const searchParams = useSearchParams();
  const route = useRouter();

  const date = searchParams.get("date");

  const hours = ["01","02","03","04","05","06","07","08","09","10","11","12"]
  const minutes = ["00","05","10","15","20","25","30","35","40","45","50","55"]
  const ampm = ["am","pm"]

  return (
    <>
      <div className={styles.container}>
        <div className="container-inner">
          <div className="detail-title">
            <div>{date}</div>
            <UnstyledButton
              type="button"
              onClick={() => route.push("/dashboard")}
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
              defaultValue="React"
              allowDeselect={false}
            />
            <Select
              placeholder="Select Employee"
              data={["p1", "p2", "p3", "p4"]}
              defaultValue="React"
              allowDeselect={false}
              mt="md"
            />
            <div className="select-time">
              <Select
                label="Start"
                placeholder="hour"
                data={hours}
                defaultValue="React"
                allowDeselect={false}
                mt="sm"
              />
              <Select
                placeholder="minute"
                data={minutes}
                defaultValue="React"
                allowDeselect={false}
                mt="sm"
              />
              <Select
                placeholder="am/pm"
                data={ampm}
                defaultValue="React"
                allowDeselect={false}
                mt="sm"
              />            
            </div>
            <div className="select-time">
              <Select
                label="End"
                placeholder="hour"
                data={hours}
                defaultValue="React"
                allowDeselect={false}
                mt="sm"
              />
              <Select
                placeholder="minute"
                data={minutes}
                defaultValue="React"
                allowDeselect={false}
                mt="sm"
              />
              <Select
                placeholder="am/pm"
                data={ampm}
                defaultValue="React"
                allowDeselect={false}
                mt="sm"
              />            
            </div>
            <Button mt="md" fullWidth>
              + add
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DailyScheduleComponent;
