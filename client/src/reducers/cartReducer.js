let initialState = [];

if (typeof window !== 'undefined') {
  const localStorageCart = localStorage.getItem('cart');
  if (localStorageCart) {
    initialState = JSON.parse(localStorageCart);
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload;
    default:
      return state;
  }
};
