"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NavComponent = () => {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("id");

  return (
    <>
      <nav className="fixed-nav">
        <Link href={"/dashboard/store/schedule?id=" + storeId}>Schedule</Link>
        <Link href={"/dashboard/store/stock" + storeId}>Stock</Link>
        <Link href={"/dashboard/store/todo" + storeId}>Todo</Link>
        <Link href={"/dashboard/store/notice" + storeId}>Notice</Link>
      </nav>
    </>
  );
};

export default NavComponent;
