import axios from 'axios';

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/category`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: { authtoken },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: { authtoken },
  });

export const getCategorySubcategories = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subcategories/${_id}`);
