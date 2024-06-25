import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "next/navigation";
import { useState } from "react";

const SetStockComponent = () => {
  const [newitem, setNewItem] = useState<boolean>(false);
  const params = useParams();
  const storeId = params["storeId"];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { itemName: "", minQuantity: 0, currQuantity: 0, price: 0 },

    validate: {
      itemName: (value) =>
        value.length < 1 ? "Name must have at least 1 letters" : null,
    },
  });

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

    alert(data);

    location.reload();
  };

  return (
    <>
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
          <Button
            onClick={() => setNewItem(true)}
            type="button"
            variant="light"
          >
            new item
          </Button>
        </Group>
      )}
    </>
  );
};

export default SetStockComponent;
