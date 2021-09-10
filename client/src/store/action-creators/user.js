import {
  getUserCartCall,
  saveUserCartCall,
  emptyUserCartCall,
} from '../../api/user';
import {
  apiCallStart,
  apiCallSuccess,
  apiCallFail,
  cartTotalPriceAction,
  addToCartAction,
  removeFromCartAction,
} from './';

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
