import { Metadata } from "next";
import NewStoreComponent from "./newStoreComponent";

export const metadata: Metadata = {
  title: "new store · planify",
};

const NewStoreLayout = () => {
  return (
    <>
      <NewStoreComponent/>
    </>
  )
}

export default NewStoreLayout;