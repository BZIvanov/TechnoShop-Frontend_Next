import axios from './axios';

export const getCategoriesCall = () => {
  return axios.get('/category');
};

export const createCategoryCall = (category, authtoken) => {
  return axios.post('/category', category, {
    headers: { authtoken },
  });
};

export const removeCategoryCall = (slug, authtoken) => {
  return axios.delete(`/category/${slug}`, {
    headers: { authtoken },
  });
};
