import { createProductCall } from '../../api/product';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const createProductType = (product) => ({
  type: actionType.CREATE_PRODUCT,
  payload: product,
});

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
