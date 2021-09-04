import axios from 'axios';

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);
