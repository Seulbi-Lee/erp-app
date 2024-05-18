import { Metadata } from "next";
import NewStoreComponent from "./newStoreComponent";
import { createServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "new store · planify",
};

const NewStoreLayout = async () => {
  return (
    <>
      <NewStoreComponent/>
    </>
  )
}

export default NewStoreLayout;