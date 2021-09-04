import axios from './axios';

export const getCategoriesCall = () => {
  return axios.get('/category');
};

export const getCategoryCall = (slug) => {
  return axios.get(`/category/${slug}`);
};

export const createCategoryCall = (categoryName, authtoken) => {
  return axios.post(
    '/category',
    { name: categoryName },
    {
      headers: { authtoken },
    }
  );
};

export const updateCategoryCall = (slug, categoryName, authtoken) => {
  return axios.put(
    `/category/${slug}`,
    { name: categoryName },
    {
      headers: { authtoken },
    }
  );
};

export const removeCategoryCall = (slug, authtoken) => {
  return axios.delete(`/category/${slug}`, {
    headers: { authtoken },
  });
};
