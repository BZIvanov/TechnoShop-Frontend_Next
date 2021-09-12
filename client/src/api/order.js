import axios from './axios';

export const getOrdersCall = (authtoken) => {
  return axios.get('/order', { headers: { authtoken } });
};

export const createOrderCall = (stripePayment, authtoken) => {
  return axios.post('/order', stripePayment, {
    headers: { authtoken },
  });
};

export const updateOrderCall = (id, status, authtoken) => {
  return axios.put(`/order/${id}`, status, {
    headers: { authtoken },
  });
};
