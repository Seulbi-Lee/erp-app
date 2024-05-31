"use client";

import { Select } from "@mantine/core";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const StoreHeaderComponent = ({
  username,
  storeData,
}: {
  username: string | undefined | null;
  storeData: any[];
}) => {
  const params = useParams();
  const router = useRouter();
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
              label: store.stores?.storename
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
