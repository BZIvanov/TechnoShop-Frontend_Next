import { actionType } from '../action-types';

const initialState = {
  products: [],
  selectedProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
