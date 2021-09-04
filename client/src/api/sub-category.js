import axios from './axios';

export const getAllSubcategoriesCall = () => {
  return axios.get('/subcategory');
};

export const getSubcategoryCall = (slug) => {
  return axios.get(`/subcategory/${slug}`);
};

export const createSubcategoryCall = (subcategory, authtoken) => {
  return axios.post('/subcategory', subcategory, {
    headers: { authtoken },
  });
};

export const updateSubcategoryCall = (slug, subcategory, authtoken) => {
  return axios.put(`/subcategory/${slug}`, subcategory, {
    headers: { authtoken },
  });
};

export const removeSubcategoryCall = (slug, authtoken) => {
  return axios.delete(`/subcategory/${slug}`, {
    headers: { authtoken },
  });
};
