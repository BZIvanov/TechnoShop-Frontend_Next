import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { Category } from "../../services/types/categories";
import { Subcategory } from "../../services/types/subcategories";

interface ProductFiltersState {
  text: string;
  price: number[];
  categories: Category["_id"][];
  subcategories: Subcategory["_id"][];
  rating: null | number;
  shipping: string;
  brands: string[];
}

const initialState: ProductFiltersState = {
  text: "",
  price: [0, 4999],
  categories: [],
  subcategories: [],
  rating: null,
  shipping: "",
  brands: [],
};

const productsFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<Partial<ProductFiltersState>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { changeFilter } = productsFiltersSlice.actions;

export default productsFiltersSlice.reducer;

export const selectFilters = (state: RootState) => state.productsFilters;
export const selectFilterByKey =
  <K extends keyof ProductFiltersState>(key: K) =>
  (state: RootState): ProductFiltersState[K] =>
    state.productsFilters[key];
