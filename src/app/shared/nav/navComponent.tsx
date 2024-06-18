"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const NavComponent = () => {
  const params = useParams();
  const storeId = params["storeId"];

  return (
    <>
      <nav className="fixed-nav">
        <Link href={`/store/${storeId}/schedule`}>Schedule</Link>
        <Link href={`/store/${storeId}/stock`}>Stock</Link>
        <Link href={`/store/${storeId}/todo`}>Todo</Link>
        <Link href={`/store/${storeId}/notice`}>Notice</Link>
      </nav>
    </>
  );
};

export default NavComponent;
