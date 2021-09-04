import { actionType } from '../action-types';

export const apiCallStart = () => ({ type: actionType.API_CALL_START });

export const apiCallSuccess = (message = '') => ({
  type: actionType.API_CALL_SUCCESS,
  payload: message,
});

export const apiCallFail = (message) => ({
  type: actionType.API_CALL_FAIL,
  payload: message,
});

export const apiCallReset = () => ({
  type: actionType.API_CALL_RESET,
});
