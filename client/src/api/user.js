import axios from './axios';

export const currentAdmin = (authtoken) => {
  return axios.post('/current-admin', {}, { headers: { authtoken } });
};
