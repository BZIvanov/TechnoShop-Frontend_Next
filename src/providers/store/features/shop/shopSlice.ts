import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { shopsApi } from '../../services/shops';
import { Shop } from '../../services/types/shops';

interface ShopState {
  shop: Shop | null;
  initialLoadingCompleted: boolean;
}

const initialState: ShopState = {
  shop: null,
  initialLoadingCompleted: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      shopsApi.endpoints.getSellerShop.matchFulfilled,
      (state, action) => {
        state.shop = action.payload.shop;
        state.initialLoadingCompleted = true;
      }
    );
  },
});

export default shopSlice.reducer;

export const selectShop = (state: RootState) => state.shop.shop;
export const selectShopInitialLoadingCompleted = (state: RootState) =>
  state.shop.initialLoadingCompleted;
