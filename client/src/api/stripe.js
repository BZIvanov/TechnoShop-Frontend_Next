import axios from './axios';

export const createPaymentIntentCall = (authtoken) => {
  return axios.get('/create-payment-intent', {
    headers: { authtoken },
  });
};
