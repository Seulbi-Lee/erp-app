"use client";

import { Select, rem } from "@mantine/core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";

const HeaderComponent = ({
  username,
  storeData,
}: {
  username: string | undefined | null;
  storeData: any;
}) => {
  const router = useRouter();
  const params = useParams();
  const storeId =
    params["storeId"] === undefined
      ? "dashboard"
      : (params["storeId"] as string);
  // const icon = (
  //   <IconChevronDown stroke={2} style={{ width: rem(16), height: rem(16) }} />
  // );

  return (
    <>
      <header className="header">
        <Select
          rightSection=" "
          variant="unstyled"
          placeholder="Select Store"
          defaultValue={storeId}
          data={[{ value: "dashboard", label: "All Stores" }].concat(
            storeData.map(
              (store: {
                store_id: string;
                storename: string | undefined;
                color: any;
              }) => {
                return {
                  value: store.store_id,
                  label: store.storename,
                };
              }
            )
          )}
          allowDeselect={false}
          onChange={(value) => {
            if (value === "dashboard") {
              router.push("/dashboard");
              return;
            } else {
              router.push(`/store/${value}/schedule`);
            }
          }}
        />

        <Link href="/account/mypage" className="btn-setting">
          {username}
        </Link>
      </header>
    </>
  );
};

export default HeaderComponent;
