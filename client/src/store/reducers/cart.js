import { actionType } from '../action-types';

const initialState = { cart: [] };

const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  const localStorageCart = localStorage.getItem('cart');
  if (localStorageCart) {
    // initialState.cart = JSON.parse(localStorageCart);
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      // we can have the same item in the cart more than once and we keep count to track that
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      const count = existingItem ? existingItem.count + 1 : 1;
      const filteredCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );

      const updatedState = {
        ...state,
        cart: [...filteredCart, { ...action.payload, count }],
      };

      if (isBrowser) {
        localStorage.setItem('cart', JSON.stringify(updatedState));
      }

      return updatedState;
    default:
      return state;
  }
};
