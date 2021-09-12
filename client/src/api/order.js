import axios from './axios';

export const createOrderCall = (stripePayment, authtoken) => {
  return axios.post('/order', stripePayment, {
    headers: { authtoken },
  });
};
