import { actionType } from '../action-types';

const initialState = { cart: [], totalPrice: 0 };

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
      const [product, count] = action.payload;
      // we can have the same item in the cart more than once and we keep count to track that
      const existingItem = state.cart.find((item) => item._id === product._id);

      const previousProductCount = existingItem ? existingItem.count : 0;
      product.count = previousProductCount + count;

      const filteredCart = state.cart.filter(
        (item) => item._id !== product._id
      );

      const updatedState = {
        ...state,
        cart: [...filteredCart, product],
      };

      if (isBrowser) {
        localStorage.setItem('cart', JSON.stringify(updatedState));
      }

      return updatedState;
    case actionType.REMOVE_FROM_CART:
      if (!action.payload) {
        return initialState;
      }

      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case actionType.TOTAL_PRICE_CART:
      return { ...state, totalPrice: action.payload };
    default:
      return state;
  }
};
