import { actionType } from '../action-types';

const initialState = {
  orders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};
