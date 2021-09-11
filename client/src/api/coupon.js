import axios from './axios';

export const getCouponsCall = () => {
  return axios.get('/coupon');
};

export const createCouponCall = (coupon, authtoken) => {
  return axios.post('/coupon', coupon, { headers: { authtoken } });
};

export const removeCouponCall = (id, authtoken) => {
  return axios.delete(`/coupon/${id}`, { headers: { authtoken } });
};
