import axios from './axios';

export const getOrdersCall = (authtoken) => {
  return axios.get('/order', { headers: { authtoken } });
};

export const createOrderCall = (stripePayment, authtoken) => {
  return axios.post('/order', stripePayment, {
    headers: { authtoken },
  });
};
