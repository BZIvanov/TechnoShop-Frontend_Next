import { actionType } from '../action-types';

const initialState = {
  wishlist: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_WISHLIST:
      return { ...state, wishlist: action.payload };
    case actionType.UPDATE_WISHLIST:
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};
