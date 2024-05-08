import styles from "@/app/(route)/dashboard/dashboard.module.scss";
import CalendarComponent from "./components/calendar";
import { Button } from "@mantine/core";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <>
      <div className={styles.container}>
        <CalendarComponent />

        <div className={styles.store_list}>
          <Button fullWidth type="button" mt="sm">
            Store 1
          </Button>
          <Button fullWidth type="button" mt="sm">
            Store 1
          </Button>
          <Link href="/auth/addStore" target="_self">
            <Button fullWidth type="button" mt="sm">
              + Add Store
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
