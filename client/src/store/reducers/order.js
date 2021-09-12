import { actionType } from '../action-types';

const initialState = {
  orders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS:
      return { ...state, orders: action.payload };
    case actionType.UPDATE_ORDER:
      const untouchedOrders = state.orders.filter(
        (order) => order._id !== action.payload._id
      );
      return { ...state, orders: [...untouchedOrders, action.payload] };
    default:
      return state;
  }
};
