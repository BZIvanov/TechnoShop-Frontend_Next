import {
  getCategoriesCall,
  createCategoryCall,
  removeCategoryCall,
} from '../../api/category';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const storeCategories = (categories) => ({
  type: actionType.GET_CATEGORIES,
  payload: categories,
});

export const storeCategory = (category) => ({
  type: actionType.CREATE_CATEGORY,
  payload: category,
});

export const removeCategory = (slug) => ({
  type: actionType.REMOVE_CATEGORY,
  payload: slug,
});

export const getCategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getCategoriesCall();

      dispatch(apiCallSuccess());
      dispatch(storeCategories(data));
    } catch (error) {
      dispatch(apiCallFail('Get category error'));
    }
  };
};

export const createCategoryAction = (category, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await createCategoryCall(category, token);

      dispatch(apiCallSuccess(`Category '${data.name}' created`));
      dispatch(storeCategory(data));
    } catch (error) {
      dispatch(apiCallFail('Create category error'));
    }
  };
};

export const removeCategoryAction = (slug, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await removeCategoryCall(slug, token);

      dispatch(apiCallSuccess(`Category removed`));
      dispatch(removeCategory(slug));
    } catch (error) {
      dispatch(apiCallFail('Remove category error'));
    }
  };
};
