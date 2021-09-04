import axios from './axios';

export const createProductCall = (product, authtoken) => {
  return axios.post('/product', product, {
    headers: { authtoken },
  });
};
