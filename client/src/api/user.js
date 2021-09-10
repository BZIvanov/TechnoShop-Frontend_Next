import axios from './axios';

export const currentAdmin = (authtoken) => {
  return axios.post('/current-admin', {}, { headers: { authtoken } });
};

export const getUserCartCall = (authtoken) => {
  return axios.get('/user/cart', { headers: { authtoken } });
};

export const saveUserCartCall = (cart, authtoken) => {
  return axios.post('/user/cart', cart, { headers: { authtoken } });
};
