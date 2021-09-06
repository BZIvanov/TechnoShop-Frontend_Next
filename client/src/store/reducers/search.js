import { actionType } from '../action-types';

const initialState = {
  text: '',
  price: [0, 0], // [min, max]
  categories: [],
  stars: 0,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SEARCH_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
