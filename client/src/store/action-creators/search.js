import { actionType } from '../action-types';

export const searchAction = (filters) => ({
  type: actionType.SET_SEARCH_FILTERS,
  payload: filters,
});
