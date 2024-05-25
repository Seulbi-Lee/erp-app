import { Button } from "@mantine/core";
import Link from "next/link";
import { createAdmin } from "@/utils/supabase/admin";
import { createServer } from "@/utils/supabase/server";
import { getStores } from "@/app/api/getStores";
import { Metadata } from "next";
import CalendarComponent from "../../calendar/CalendarComponent";
import NavComponent from "../navComponent";

export const metadata: Metadata = {
  title: "dashboard · planify",
};

const StoreScheduleComponent = async () => {
  return (
    <>
      <div className="schedule">
        <div className="content">
          <CalendarComponent />
        </div>

        <div className="fixed-bottom">
          <div className="amount">
            <span>$ 0.00</span>
          </div>

          <NavComponent />
        </div>
      </div>
    </>
  );
};

export default StoreScheduleComponent;
