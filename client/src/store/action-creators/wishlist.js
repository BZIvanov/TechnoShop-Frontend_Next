import { getWishlistCall, updateWishlistCall } from '../../api/wishlist';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const getWishlistType = (wishlist) => ({
  type: actionType.GET_WISHLIST,
  payload: wishlist,
});

export const updateWishlistType = (product) => ({
  type: actionType.UPDATE_WISHLIST,
  payload: product,
});

export const getWishlistAction = (token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getWishlistCall(token);

      dispatch(apiCallSuccess());
      dispatch(getWishlistType(data));
    } catch (error) {
      dispatch(apiCallFail('Get wishlist error'));
    }
  };
};

export const updateWishlistAction = (productId, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await updateWishlistCall(productId, token);

      dispatch(apiCallSuccess('Added, check your wishlist'));
      dispatch(updateWishlistType(data));
    } catch (error) {
      dispatch(apiCallFail('Update wishlist error'));
    }
  };
};
