"use client";
import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "next/navigation";
import { useState } from "react";

const StoreStockComponent = () => {
  const [newitem, setNewItem] = useState<boolean>(false);
  const params = useParams();
  const storeId = params["storeId"];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { itemName: "", minQuantity: 0, currQuantity: 0, price: 0 },
  });

  const saveListHandler = () => {
    console.log("save");
  };

  console.log();

  const addNewItem = async (values: {
    itemName: string;
    currQuantity: number;
    minQuantity: number;
    price: number;
  }) => {
    const res = await fetch("/api/setStockItem", {
      method: "POST",
      body: JSON.stringify({
        storeId: storeId,
        itemName: values.itemName,
        currQuantity: values.currQuantity,
        minQuantity: values.minQuantity,
        price: values.price,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    console.log(data);
  };

  return (
    <>
      <div className="stock">
        <div className="top-area">
          <h2 className="strong">stock list</h2>
        </div>
        <ul className="stock-list">
          <li className="item">
            <div className="item-name">item1</div>
            <div className="count">
              <NumberInput
                min={0}
                max={99}
                step={0.5}
                key={form.key("quantity")}
                {...form.getInputProps("quantity")}
              />
            </div>
          </li>
        </ul>

        {newitem && (
          <form onSubmit={form.onSubmit((values) => addNewItem(values))}>
            <div className="add-list">
              <TextInput
                label="item name"
                placeholder="name"
                key={form.key("itemName")}
                {...form.getInputProps("itemName")}
              />
              <NumberInput
                label="current quantity"
                mt="sm"
                min={0}
                max={99}
                step={0.5}
                key={form.key("currQuantity")}
                {...form.getInputProps("currQuantity")}
              />
              <NumberInput
                label="minimum quantity"
                mt="sm"
                min={0}
                max={99}
                step={0.5}
                key={form.key("minQuantity")}
                {...form.getInputProps("minQuantity")}
              />
              <NumberInput
                label="price"
                mt="sm"
                min={0}
                max={99}
                step={0.5}
                key={form.key("price")}
                {...form.getInputProps("price")}
              />
              <Group justify="center" mt="md">
                <Button onClick={() => setNewItem(false)} variant="outline">
                  cancel
                </Button>
                <Button type="submit">add</Button>
              </Group>
            </div>
          </form>
        )}
        {!newitem && (
          <Group justify="center" mt="md" mb="lg">
            <Button onClick={() => setNewItem(true)} type="button">
              new item
            </Button>
          </Group>
        )}

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
