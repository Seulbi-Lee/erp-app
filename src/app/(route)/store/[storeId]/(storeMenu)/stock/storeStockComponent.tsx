"use client";
import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import SetStockComponent from "./setStockComponent";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

const StoreStockComponent = () => {
  const params = useParams();
  const storeId = params["storeId"] as string;

  const [stockList, setStockList] = useState<
    {
      curr_quantity: number | null;
      id: string;
      min_quantity: number | null;
      name: string;
      price: number | null;
      store_id: string;
    }[]
  >([]);

  const stockListData = useRef<{ id: string; curr_quantity: number | null }[]>(
    []
  );

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
      });
  }, [storeId]);

  // update items
  const saveListHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    const newData = stockListData.current.map(({ id, curr_quantity }) => ({
      id,
      curr_quantity,
    }));

    const res = await fetch("/api/updateStockItems", {
      method: "POST",
      body: JSON.stringify(newData),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    alert(data);

    // location.reload();
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

    // changed data
    if (stockListData.current.length === 0) {
      stockListData.current.push({
        id: id,
        curr_quantity: value,
      });
      return;
    }

    let found = false;
    stockListData.current.forEach((data) => {
      if (data.id === id) {
        data.curr_quantity = value;
        found = true;
      }
    });

    if (!found) {
      stockListData.current.push({
        id: id,
        curr_quantity: value,
      });
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
                  <div className="item-name">
                    <TextInput value={item.name} readOnly />
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
