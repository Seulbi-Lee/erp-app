"use client";
import { Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import SetStockComponent from "./setStockComponent";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const StoreStockComponent = () => {
  const params = useParams();
  const storeId = params["storeId"] as string;
  const [stockList, setStockList] = useState<any[] | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { currQuantity: 0 },
  });

  // TypeError: Failed to parse URL...
  useEffect(() => {
    fetch("/api/getStockItems", {
      method: "POST",
      body: JSON.stringify({
        storeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => setStockList(data));
  }, []);

  const saveListHandler = () => {
    console.log("save");
  };

  return (
    <>
      <div className="stock">
        <div className="top-area">
          <h2 className="strong">stock list</h2>
        </div>
        {stockList && (
          <ul className="stock-list">
            {stockList.map((item: { id: string; name: string; curr_quantity: number; }) => {
              return (
                <li className="item" key={item.id}>
                  <div className="item-name">{item.name}</div>
                  <div className="count">
                    <NumberInput
                      min={0}
                      max={99}
                      step={0.5}
                      key={form.key("currQuantity")}
                      {...form.getInputProps("currQuantity")}
                      defaultValue={item.curr_quantity}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <SetStockComponent />

        <Group className="fixed-button">
          <Button onClick={saveListHandler} type="button" fullWidth>
            save
          </Button>
        </Group>
      </div>
    </>
  );
};

export default StoreStockComponent;
