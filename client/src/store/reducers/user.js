import { actionType } from '../action-types';

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return { ...state, user: { ...action.payload } };
    case actionType.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
