import {
  getCouponsCall,
  createCouponCall,
  removeCouponCall,
} from '../../api/coupon';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const allCouponsType = (coupons) => ({
  type: actionType.GET_COUPONS,
  payload: coupons,
});

export const createCouponType = (coupon) => ({
  type: actionType.CREATE_COUPON,
  payload: coupon,
});

export const removeCouponType = (id) => ({
  type: actionType.REMOVE_COUPON,
  payload: id,
});

export const applyCouponAction = (value) => ({
  type: actionType.APPLY_COUPON,
  payload: value,
});

export const getAllCouponsAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getCouponsCall();

      dispatch(apiCallSuccess());
      dispatch(allCouponsType(data));
    } catch (error) {
      dispatch(apiCallFail('Get coupons error'));
    }
  };
};

export const createCouponAction = (coupon, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await createCouponCall(coupon, token);

      dispatch(apiCallSuccess(`Coupon '${data.name}' created`));
      dispatch(createCouponType(data));
    } catch (error) {
      dispatch(apiCallFail('Create coupon error'));
    }
  };
};

export const removeCouponAction = (id, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await removeCouponCall(id, token);

      dispatch(apiCallSuccess(`Coupon removed`));
      dispatch(removeCouponType(id));
    } catch (error) {
      dispatch(apiCallFail('Remove coupon error'));
    }
  };
};
