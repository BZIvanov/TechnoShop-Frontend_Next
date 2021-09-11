import {
  updateUserCall,
  getUserCartCall,
  saveUserCartCall,
  applyDiscountCouponCall,
  emptyUserCartCall,
} from '../../api/user';
import {
  apiCallStart,
  apiCallSuccess,
  apiCallFail,
  cartTotalPriceAction,
  cartTotalPriceAfterDiscountAction,
  addToCartAction,
  removeFromCartAction,
} from './';
import { actionType } from '../action-types';

export const updateUserType = (user) => ({
  type: actionType.UPDATE_USER,
  payload: user,
});

export const updateUserAction = (userData, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await updateUserCall(userData, token);

      dispatch(apiCallSuccess('Success'));
      dispatch(updateUserType(data));
    } catch (error) {
      dispatch(apiCallFail('Save cart error'));
    }
  };
};

export const getUserCartAction = (token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data: cart } = await getUserCartCall(token);

      dispatch(apiCallSuccess());
      // without providing parameters we clear the whole cart
      dispatch(removeFromCartAction());
      // set new cart with data from backend
      dispatch(cartTotalPriceAction(cart.cartTotal));
      cart.products.forEach((product) => {
        dispatch(
          addToCartAction(
            { ...product.product, color: product.color },
            product.count
          )
        );
      });
    } catch (error) {
      dispatch(apiCallFail('Get cart error'));
    }
  };
};

export const saveUserCartAction = (cart, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await saveUserCartCall(cart, token);

      dispatch(apiCallSuccess('Success'));
    } catch (error) {
      dispatch(apiCallFail('Save cart error'));
    }
  };
};

export const applyDiscountCouponAction = (coupon, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await applyDiscountCouponCall(coupon, token);

      dispatch(apiCallSuccess('Success'));
      dispatch(cartTotalPriceAfterDiscountAction(data));
    } catch (error) {
      dispatch(apiCallFail('Apply coupon error'));
    }
  };
};

export const emptyUserCartAction = (token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await emptyUserCartCall(token);

      dispatch(apiCallSuccess('Success'));
      dispatch(removeFromCartAction());
    } catch (error) {
      dispatch(apiCallFail('Save cart error'));
    }
  };
};
