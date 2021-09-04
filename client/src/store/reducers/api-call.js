import { actionType } from '../action-types';

const initialState = {
  loading: false,
  success: '',
  error: '',
};

export const apiCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.API_CALL_START:
      return { ...state, loading: true, success: '', error: '' };
    case actionType.API_CALL_SUCCESS:
      return { ...state, loading: false, success: action.payload, error: '' };
    case actionType.API_CALL_FAIL:
      return { ...state, loading: false, success: '', error: action.payload };
    case actionType.API_CALL_RESET:
      return initialState;
    default:
      return state;
  }
};
