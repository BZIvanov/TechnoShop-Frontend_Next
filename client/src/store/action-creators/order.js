import { getOrdersCall } from '../../api/order';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const getOrdersType = (orders) => ({
  type: actionType.GET_ORDERS,
  payload: orders,
});

export const getOrdersAction = (token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getOrdersCall(token);

      dispatch(apiCallSuccess());
      dispatch(getOrdersType(data));
    } catch (error) {
      dispatch(apiCallFail('Get orders error'));
    }
  };
};
