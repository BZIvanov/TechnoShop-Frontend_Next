import { type FC, type ReactNode } from "react";
import { Provider } from "react-redux";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";

import { createStore } from "./store";

interface StoreProviderProps {
  children: ReactNode;
  preloadedState?: ConfigureStoreOptions["preloadedState"];
}

const StoreProvider: FC<StoreProviderProps> = ({
  children,
  preloadedState,
}) => {
  const store = createStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
