import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { Product } from '../../services/types/products';

interface CartItem {
  product: Product;
  count: number;
}

interface CartState {
  cart: Record<string, CartItem>;
  isDrawerOpen: boolean;
}

const initialState: CartState = {
  cart: {},
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; count: number }>
    ) => {
      const { product, count } = action.payload;
      state.cart[product._id] = { product, count };
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const cartProducts = Object.assign(state.cart, {});
      delete cartProducts[action.payload];
      state.cart = cartProducts;
    },
    clearCart: () => initialState,
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setDrawerOpen } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectIsDrawerOpen = (state: RootState) => state.cart.isDrawerOpen;
export const selectCartProductById =
  (productId: string) => (state: RootState) =>
    state.cart.cart[productId];
