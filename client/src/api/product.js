import axios from './axios';

export const getProductsCall = (config) => {
  return axios.get('/product', { params: {} && { ...config } });
};

export const getProductCall = (slug) => {
  return axios.get(`/product/${slug}`);
};

export const createProductCall = (product, authtoken) => {
  return axios.post('/product', product, {
    headers: { authtoken },
  });
};

export const updateProductCall = (slug, product, authtoken) => {
  return axios.put(`/product/${slug}`, product, {
    headers: { authtoken },
  });
};

export const removeProductCall = (slug, authtoken) => {
  return axios.delete(`/product/${slug}`, {
    headers: { authtoken },
  });
};

export const rateProductCall = (productId, rating, authtoken) => {
  return axios.put(`/product/${productId}/rate`, rating, {
    headers: { authtoken },
  });
};
