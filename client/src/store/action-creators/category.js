import {
  getCategoriesCall,
  getCategoryCall,
  createCategoryCall,
  updateCategoryCall,
  removeCategoryCall,
  getCategorySubcategoriesCall,
} from '../../api/category';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const allCategoriesType = (categories) => ({
  type: actionType.GET_CATEGORIES,
  payload: categories,
});

export const selectedCategoryType = (category) => ({
  type: actionType.GET_CATEGORY,
  payload: category,
});

export const createCategoryType = (category) => ({
  type: actionType.CREATE_CATEGORY,
  payload: category,
});

export const updateCategoryType = (category) => ({
  type: actionType.UPDATE_CATEGORY,
  payload: category,
});

export const removeCategoryType = (slug) => ({
  type: actionType.REMOVE_CATEGORY,
  payload: slug,
});

export const getCategorySubcategoriesType = (subcategories) => ({
  type: actionType.GET_CATEGORY_SUBCATEGORIES,
  payload: subcategories,
});

export const getAllCategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getCategoriesCall();

      dispatch(apiCallSuccess());
      dispatch(allCategoriesType(data));
    } catch (error) {
      dispatch(apiCallFail('Get categories error'));
    }
  };
};

export const getCategoryAction = (slug) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getCategoryCall(slug);

      dispatch(apiCallSuccess());
      dispatch(selectedCategoryType(data));
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
      dispatch(createCategoryType(data));
    } catch (error) {
      dispatch(apiCallFail('Create category error'));
    }
  };
};

export const updateCategoryAction = (slug, category, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await updateCategoryCall(slug, category, token);

      dispatch(apiCallSuccess(`Category '${data.name}' updated`));
      dispatch(updateCategoryType(data));
    } catch (error) {
      dispatch(apiCallFail('Update category error'));
    }
  };
};

export const removeCategoryAction = (slug, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await removeCategoryCall(slug, token);

      dispatch(apiCallSuccess(`Category removed`));
      dispatch(removeCategoryType(slug));
    } catch (error) {
      dispatch(apiCallFail('Remove category error'));
    }
  };
};

export const getCategorySubcategoriesAction = (id) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getCategorySubcategoriesCall(id);

      dispatch(apiCallSuccess());
      dispatch(getCategorySubcategoriesType(data));
    } catch (error) {
      dispatch(apiCallFail('Get category subcategories error'));
    }
  };
};
