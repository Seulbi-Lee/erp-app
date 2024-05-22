import styles from "@/app/(route)/auth/auth.module.scss";
import { Metadata } from "next";
import SetMemberInfoComponent from "./setMemberInfoComponent";

export const metadata: Metadata = {
  title: "member info · planify",
};

const SetMemberInfoLayout = async() => {
  return (
    <>
      <div className={styles.container}>
        <SetMemberInfoComponent />
      </div>
    </>
  )
}

export default SetMemberInfoLayout;