import { actionType } from '../action-types';

const initialState = {
  isVisible: false,
};

export const sidedrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_SIDE_DRAWER:
      return { ...state, isVisible: action.payload };
    default:
      return state;
  }
};
