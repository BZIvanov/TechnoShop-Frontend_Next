import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";

import { api } from "./services/api";
import userSlice from "./features/user/userSlice";
import shopSlice from "./features/shop/shopSlice";
import notificationSlice from "./features/notification/notificationSlice";
import productsFiltersSlice from "./features/productsFilters/productsFiltersSlice";
import cartSlice from "./features/cart/cartSlice";
import { asyncErrorNotification } from "./middlewares/asyncErrorNotification";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      user: userSlice,
      shop: shopSlice,
      notification: notificationSlice,
      productsFilters: productsFiltersSlice,
      cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, asyncErrorNotification),
    // import.meta.env.MODE is provided by Vite
    devTools: import.meta.env.MODE === "development",
    ...options,
  });

// this store constant is used only for the types below
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
