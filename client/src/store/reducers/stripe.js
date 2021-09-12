import { actionType } from '../action-types';

const initialState = {
  clientSecret: '',
};

export const stripeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CLIENT_SECRET:
      return { ...state, clientSecret: action.payload };
    default:
      return state;
  }
};
