import axios from 'axios';

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/category`);
