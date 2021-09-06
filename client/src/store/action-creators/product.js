import {
  getProductsCall,
  getProductCall,
  createProductCall,
  updateProductCall,
  removeProductCall,
  rateProductCall,
} from '../../api/product';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';
import { PRODUCT_TYPES_FETCH } from '../../constants';

export const getProductsType = (products, config) => {
  let type = actionType.GET_ALL_PRODUCTS;
  if (config.productsType === PRODUCT_TYPES_FETCH.NEWEST) {
    type = actionType.GET_NEWEST_PRODUCTS;
  } else if (config.productsType === PRODUCT_TYPES_FETCH.BESTSELLING) {
    type = actionType.GET_BESTSELLING_PRODUCTS;
  }

  return {
    type,
    payload: products,
  };
};

export const getProductType = (product) => ({
  type: actionType.GET_PRODUCT,
  payload: product,
});

export const createProductType = (product) => ({
  type: actionType.CREATE_PRODUCT,
  payload: product,
});

export const updateProductType = (product) => ({
  type: actionType.UPDATE_PRODUCT,
  payload: product,
});

export const removeProductType = (slug) => ({
  type: actionType.REMOVE_PRODUCT,
  payload: slug,
});

export const getProductsAction = (config) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getProductsCall(config);

      dispatch(apiCallSuccess());
      dispatch(getProductsType(data, config));
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

export const updateProductAction = (slug, product, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await updateProductCall(slug, product, token);

      dispatch(apiCallSuccess(`Product '${data.title}' updated`));
      dispatch(updateProductType(data));
    } catch (error) {
      dispatch(apiCallFail('Update product error'));
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

export const rateProductAction = (productId, rating, authtoken) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await rateProductCall(productId, rating, authtoken);

      dispatch(apiCallSuccess('Rated successfuly'));
      dispatch(getProductType(data));
    } catch (error) {
      dispatch(apiCallFail('Rate product error'));
    }
  };
};
