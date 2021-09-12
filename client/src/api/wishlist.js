import axios from './axios';

export const getWishlistCall = (authtoken) => {
  return axios.get('/wishlist', { headers: { authtoken } });
};

export const updateWishlistCall = (productId, authtoken) => {
  return axios.put(`/wishlist/${productId}`, {}, { headers: { authtoken } });
};
