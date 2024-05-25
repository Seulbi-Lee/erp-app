import styles from "@/app/(route)/auth/auth.module.scss";
import { Metadata } from "next";
import SetMemberInfoComponent from "./setMemberInfoComponent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "member info · planify",
};

const SetMemberInfoLayout = async() => {
  return (
    <Suspense>
      <div className={styles.container}>
        <SetMemberInfoComponent />
      </div>
    </Suspense>
  )
}

export default SetMemberInfoLayout;