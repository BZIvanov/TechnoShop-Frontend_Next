import { actionType } from '../action-types';

export const apiCallStart = () => ({ type: actionType.API_CALL_START });

export const apiCallSuccess = () => ({
  type: actionType.API_CALL_SUCCESS,
});

export const apiCallFail = (message) => ({
  type: actionType.API_CALL_FAIL,
  payload: message,
});
