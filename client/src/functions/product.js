import axios from 'axios';

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${count}`);

export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
