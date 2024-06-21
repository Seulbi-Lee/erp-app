import "server-only";

import { Metadata } from "next";
import StoreScheduleComponent from "./storeScheduleComponent";

export const metadata: Metadata = {
  title: "schedule · planify",
};

const StoreSchedulePage = async () => {
  return (
    <>
      <StoreScheduleComponent />
    </>
  );
};

export default StoreSchedulePage;
