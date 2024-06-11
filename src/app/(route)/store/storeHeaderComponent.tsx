"use client";

import { useScheduleContext } from "@/app/contexts/schedule.provider";
import { Select } from "@mantine/core";
import { DateTime } from "luxon";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const StoreHeaderComponent = ({
  username,
  storeData,
}: {
  username: string | undefined | null;
  storeData: any[];
}) => {
  const router = useRouter();
  const params = useParams();
  const storeId = params["storeId"] as string;

  return (
    <>
      <header className="header">
        <Link href={"/dashboard"}>HOME</Link>
        <Select
          placeholder="Select Store"
          defaultValue={storeId}
          data={storeData.map((store) => {
            return {
              value: store.store_id,
              label: store.stores?.storename,
            };
          })}
          allowDeselect={false}
          onChange={(value) => router.push(`/store/${value}/schedule`)}
        />

        <Link href="/account/mypage">{username}</Link>
      </header>
    </>
  );
};

export default StoreHeaderComponent;
