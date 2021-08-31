import { actionType } from '../action-types';

const initialState = {
  loading: false,
  error: '',
};

export const apiCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.API_CALL_START:
      return { ...state, loading: true, error: '' };
    case actionType.API_CALL_SUCCESS:
      return { ...state, loading: false, error: '' };
    case actionType.API_CALL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
