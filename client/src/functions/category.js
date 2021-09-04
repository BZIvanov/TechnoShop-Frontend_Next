import axios from 'axios';

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/category`);

export const getCategorySubcategories = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subcategories/${_id}`);
