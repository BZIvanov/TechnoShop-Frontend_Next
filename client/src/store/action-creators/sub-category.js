import {
  getAllSubcategoriesCall,
  getSubcategoryCall,
  createSubcategoryCall,
  updateSubcategoryCall,
  removeSubcategoryCall,
} from '../../api/sub-category';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const allSubcategoriesType = (subcategories) => ({
  type: actionType.GET_SUBCATEGORIES,
  payload: subcategories,
});

export const selectedSubcategoryType = (subcategory) => ({
  type: actionType.GET_SUBCATEGORY,
  payload: subcategory,
});

export const creatSubcategoryType = (subcategory) => ({
  type: actionType.CREATE_SUBCATEGORY,
  payload: subcategory,
});

export const updateSubcategoryType = (subcategory) => ({
  type: actionType.UPDATE_SUBCATEGORY,
  payload: subcategory,
});

export const removeSubcategoryType = (slug) => ({
  type: actionType.REMOVE_SUBCATEGORY,
  payload: slug,
});

export const getAllSubcategoriesAction = () => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getAllSubcategoriesCall();

      dispatch(apiCallSuccess());
      dispatch(allSubcategoriesType(data));
    } catch (error) {
      dispatch(apiCallFail('Get subcategories error'));
    }
  };
};

export const getSubcategoryAction = (slug) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await getSubcategoryCall(slug);

      dispatch(apiCallSuccess());
      dispatch(selectedSubcategoryType(data));
    } catch (error) {
      dispatch(apiCallFail('Get subcategory error'));
    }
  };
};

export const createSubcategoryAction = (subcategory, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await createSubcategoryCall(subcategory, token);

      dispatch(apiCallSuccess(`Subcategory '${data.name}' created`));
      dispatch(creatSubcategoryType(data));
    } catch (error) {
      dispatch(apiCallFail('Create subcategory error'));
    }
  };
};

export const updateSubcategoryAction = (slug, subcategory, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await updateSubcategoryCall(slug, subcategory, token);

      dispatch(apiCallSuccess(`Subcategory '${data.name}' updated`));
      dispatch(updateSubcategoryType(data));
    } catch (error) {
      dispatch(apiCallFail('Update subcategory error'));
    }
  };
};

export const removeSubcategoryAction = (slug, token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      await removeSubcategoryCall(slug, token);
      console.log(slug);
      dispatch(apiCallSuccess(`Subcategory removed`));
      dispatch(removeSubcategoryType(slug));
    } catch (error) {
      dispatch(apiCallFail('Remove subcategory error'));
    }
  };
};
