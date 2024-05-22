import { Metadata } from "next";
import JoinStoreComponent from "./joinStoreComponent";

export const metadata: Metadata = {
  title: "new store · planify",
};

const NewStoreLayout = async () => {
  return (
    <>
      <JoinStoreComponent/>
    </>
  )
}

export default NewStoreLayout;