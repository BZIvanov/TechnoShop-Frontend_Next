import axios from './axios';

export const currentAdmin = (authtoken) => {
  return axios.post('/current-admin', {}, { headers: { authtoken } });
};

export const updateUserCall = (data, authtoken) => {
  return axios.put('/user', data, { headers: { authtoken } });
};

export const getUserCartCall = (authtoken) => {
  return axios.get('/user/cart', { headers: { authtoken } });
};

export const saveUserCartCall = (cart, authtoken) => {
  return axios.post('/user/cart', cart, { headers: { authtoken } });
};

export const applyDiscountCouponCall = (coupon, authtoken) => {
  return axios.put('/user/cart', coupon, { headers: { authtoken } });
};

export const emptyUserCartCall = (authtoken) => {
  return axios.delete('/user/cart', { headers: { authtoken } });
};
