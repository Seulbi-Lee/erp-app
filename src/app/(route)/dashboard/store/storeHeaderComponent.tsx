"use client";

import { Select } from "@mantine/core";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const StoreHeaderComponent = ({
  username,
  storeData,
}: {
  username: string | undefined | null;
  storeData: any[];
}) => {
  const searchParams = useSearchParams();
  const route = useRouter();
  const storeId = searchParams.get("id");

  return (
    <>
      <header className="header">
        <Link href={"/dashboard"}>HOME</Link>
        <Select
          placeholder="Select Store"
          defaultValue="store1"
          data={storeData.map((store, index) => {
            return {
              value: "/dashboard/store/schedule?id=" + store.store_id,
              label: store.stores?.storename,
              index: index,
            };
          })}
          allowDeselect={false}
          onChange={(_value, option) => route.push(option.value)}
        />

        <Link href="/account/mypage">{username}</Link>
      </header>
    </>
  );
};

export default StoreHeaderComponent;
