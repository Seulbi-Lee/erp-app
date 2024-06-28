"use client";
import { Button, Group, NumberInput, Popover, TextInput } from "@mantine/core";
import SetStockComponent from "./setStockComponent";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { IconDotsVertical } from "@tabler/icons-react";

const StoreStockComponent = () => {
  const params = useParams();
  const storeId = params["storeId"] as string;

  const [stockList, setStockList] = useState<
    {
      curr_quantity: number | null;
      id: string;
      name: string;
      min_quantity: number | undefined;
      price: number | undefined;
      store_id: string;
    }[]
  >([]);

  const stockListData = useRef<{ id: string; curr_quantity: number | null }[]>(
    []
  );

  const changedStockIdSetRef = useRef<Set<string>>(new Set());

  // get items
  useEffect(() => {
    fetch("/api/getStockItems", {
      method: "POST",
      body: JSON.stringify({
        storeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStockList(data);
        changedStockIdSetRef.current = new Set();
      });
  }, [storeId]);

  // update items
  const saveListHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    const newData: { id: string; curr_quantity: number }[] = [];
    stockList.forEach((s) => {
      if (changedStockIdSetRef.current.has(s.id)) {
        newData.push({ id: s.id, curr_quantity: s.curr_quantity || 0 });
      }
    });

    // const newData = stockList
    //   .filter((s) => changedStockIdSetRef.current.has(s.id))
    //   .map((s) => ({ id: s.id, curr_quantity: s.curr_quantity || 0 }));

    // const newData = stockListData.current.map(({ id, curr_quantity }) => ({
    //   id,
    //   curr_quantity,
    // }));

    const res = await fetch("/api/updateStockItems", {
      method: "POST",
      body: JSON.stringify(newData),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    changedStockIdSetRef.current = new Set();
    const data = await res.json();

    alert(data);

    location.reload();
  };

  const updateCurrentQuantity = (
    value: number,
    index: number,
    id: string
  ): void => {
    setStockList((prevState) => {
      const newState = [...prevState];

      // newState[index] = {...newState[index], curr_quantity: value}
      newState[index].curr_quantity = value;

      return newState;
    });

    changedStockIdSetRef.current.add(id);

    // changed data
    // if (stockListData.current.length === 0) {
    //   stockListData.current.push({
    //     id: id,
    //     curr_quantity: value,
    //   });
    //   return;
    // }

    // let found = false;
    // stockListData.current.forEach((data) => {
    //   if (data.id === id) {
    //     data.curr_quantity = value;
    //     found = true;
    //   }
    // });

    // if (!found) {
    //   stockListData.current.push({
    //     id: id,
    //     curr_quantity: value,
    //   });
    // }
  };

  const itemEditHandler = () => {};

  // delete item
  const itemDeleteHandler = async (itemId: string) => {
    if (confirm("Are you sure you want to delete?") === true) {
      const res = await fetch("/api/deleteStockItem", {
        method: "POST",
        body: JSON.stringify(itemId),
      });

      if (!res.ok) {
        console.log(res.statusText);
      }

      const data = await res.json();

      alert(data);

      location.reload();
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="stock">
        <div className="top-area">
          <h2 className="strong">stock list</h2>
        </div>
        <form onSubmit={saveListHandler}>
          <ul className="stock-list">
            {stockList.map((item, index) => {
              return (
                <li className="item" key={item.id}>
                  <div className="item-title">
                    <TextInput
                      className="item-name"
                      value={item.name}
                      readOnly
                    />
                    <div className="item-info">
                      <TextInput
                        className="item-min-quantity"
                        label="min"
                        value={item.min_quantity}
                        size="xs"
                        readOnly
                      />
                      <TextInput
                        className="item-price"
                        label="price"
                        value={item.price}
                        size="xs"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="count">
                    <NumberInput
                      min={0}
                      max={99}
                      step={0.5}
                      value={item.curr_quantity || 0}
                      onChange={(value) => {
                        updateCurrentQuantity(+value, index, item.id);
                      }}
                    />
                  </div>

                  <div className="popover">
                    <Popover width={100} position="bottom" shadow="md">
                      <Popover.Target>
                        <Button
                          type="button"
                          variant="transparent"
                          className="more-btn"
                        >
                          <IconDotsVertical stroke={1} />
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown className="stock-popover-dropdown">
                        <Button
                          type="button"
                          variant="transparent"
                          size="sm"
                          onClick={itemEditHandler}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="transparent"
                          size="sm"
                          onClick={() => itemDeleteHandler(item.id)}
                        >
                          Delete
                        </Button>
                      </Popover.Dropdown>
                    </Popover>
                  </div>
                </li>
              );
            })}
          </ul>

          <Group className="fixed-button">
            <Button type="submit" fullWidth>
              save
            </Button>
          </Group>
        </form>

        <SetStockComponent />
      </div>
    </>
  );
};

export default StoreStockComponent;
