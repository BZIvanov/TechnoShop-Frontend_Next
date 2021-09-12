import { getOrdersCall, updateOrderCall } from '../../api/order';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const getOrdersType = (orders) => ({
  type: actionType.GET_ORDERS,
  payload: orders,
});

export const updateOrderType = (order) => ({
  type: actionType.UPDATE_ORDER,
  payload: order,
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

export const updateOrderAction = (id, status, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await updateOrderCall(id, status, token);

      dispatch(apiCallSuccess());
      dispatch(updateOrderType(data));
    } catch (error) {
      dispatch(apiCallFail('Update order error'));
    }
  };
};
