import { actionType } from '../action-types';

export const addToCartAction = (product, count) => {
  return {
    type: actionType.ADD_TO_CART,
    payload: [product, count],
  };
};

export const removeFromCartAction = (product) => {
  return {
    type: actionType.REMOVE_FROM_CART,
    payload: product,
  };
};
