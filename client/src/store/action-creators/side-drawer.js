import { actionType } from '../action-types';

export const toggleVisibleAction = (isVisible) => ({
  type: actionType.TOGGLE_SIDE_DRAWER,
  payload: isVisible,
});
