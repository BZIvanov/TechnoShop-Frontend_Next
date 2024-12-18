import { type PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";

import { createStore } from "./store";

interface StoreProviderProps {
  preloadedState?: ConfigureStoreOptions["preloadedState"];
}

const StoreProvider = ({
  children,
  preloadedState,
}: PropsWithChildren<StoreProviderProps>) => {
  const store = createStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
