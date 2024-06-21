import "server-only";

import { Metadata } from "next";
import StoreStockComponent from "./storeStockComponent";

export const metadata: Metadata = {
  title: "stock · planify",
};

const StoreStockPage = () => {
  return (
    <>
      <StoreStockComponent />
    </>
  );
};

export default StoreStockPage;
