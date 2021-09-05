import {
  getProductsCall,
  getProductCall,
  createProductCall,
  removeProductCall,
} from '../../api/product';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const getProductsType = (products) => ({
  type: actionType.GET_PRODUCTS,
  payload: products,
});

export const getProductType = (category) => ({
  type: actionType.GET_PRODUCT,
  payload: category,
});

export const createProductType = (product) => ({
  type: actionType.CREATE_PRODUCT,
  payload: product,
});

export const removeProductType = (slug) => ({
  type: actionType.REMOVE_PRODUCT,
  payload: slug,
});

export const getProductsAction = (count) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getProductsCall(count);

      dispatch(apiCallSuccess());
      dispatch(getProductsType(data));
    } catch (error) {
      dispatch(apiCallFail('Get products error'));
    }
  };
};

export const getProductAction = (slug) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getProductCall(slug);

      dispatch(apiCallSuccess());
      dispatch(getProductType(data));
    } catch (error) {
      dispatch(apiCallFail('Get product error'));
    }
  };
};

export const createProductAction = (product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await createProductCall(product, token);

      dispatch(apiCallSuccess(`Product '${data.title}' created`));
      dispatch(createProductType(data));
    } catch (error) {
      dispatch(apiCallFail('Create product error'));
    }
  };
};

export const removeProductAction = (slug, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await removeProductCall(slug, token);

      dispatch(apiCallSuccess(`Product removed`));
      dispatch(removeProductType(slug));
    } catch (error) {
      dispatch(apiCallFail('Remove product error'));
    }
  };
};
