import { actionType } from '../action-types';
import { PAYMENT_TYPES } from '../../constants';

// stripe or cash, defaults to stripe
const initialState = {
  paymentType: PAYMENT_TYPES.STRIPE,
  clientSecret: '',
};

// holds information related to payments
export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PAYMENT_TYPE:
      return { ...state, paymentType: action.payload };
    case actionType.SET_CLIENT_SECRET:
      return { ...state, clientSecret: action.payload };
    default:
      return state;
  }
};
