import axios from './axios';

export const uploadImageCall = (uri, authtoken) => {
  return axios.post('/uploadimage', { image: uri }, { headers: { authtoken } });
};

export const removeImageCall = (public_id, authtoken) => {
  return axios.post('/removeimage', { public_id }, { headers: { authtoken } });
};
