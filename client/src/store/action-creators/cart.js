import { actionType } from '../action-types';

export const addToCartAction = (product) => {
  return {
    type: actionType.ADD_TO_CART,
    payload: product,
  };
};
