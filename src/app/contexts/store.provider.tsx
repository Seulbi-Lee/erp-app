import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const StoreStore = createContext<string | undefined>(undefined);
const StoreAction = createContext<Dispatch<SetStateAction<string>> | undefined>(
  undefined
);

export const useStoreStore = () => {
  const context = useContext(StoreStore);
  if (context === undefined) {
    throw new Error("useStoreStore must be used within a StoreProvider");
  }
  return context;
};

export const useStoreAction = () => {
  const context = useContext(StoreAction);
  if (context === undefined) {
    throw new Error("useStoreAction must be used within a storeProvider");
  }
  return context;
};

const StoreProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const [store, action] = useState("");

  return (
    <>
      <StoreStore.Provider value={store}>
        <StoreAction.Provider value={action}>{children}</StoreAction.Provider>
      </StoreStore.Provider>
    </>
  );
};

export default StoreProviderComponent;
