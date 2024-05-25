"use client";

import { Select } from "@mantine/core";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const HeaderComponent = ({
  username,
}: {
  username: string | undefined | null;
}) => {
  const searchParams = useSearchParams();
  const route = useRouter();

  const storeId = searchParams.get("id");

  return (
    <>
      <header className="header">
        <Select
          placeholder="Select Store"
          defaultValue="store1"
          data={[
            { value: "/dashboard", label: "home" },
            { value: "/dashboard/store", label: "store1" },
          ]}
          allowDeselect={false}
          onChange={(_value, option) => route.push(option.value)}
        />

        <Link href="/account/mypage">{username}</Link>
      </header>
    </>
  );
};

export default HeaderComponent;
