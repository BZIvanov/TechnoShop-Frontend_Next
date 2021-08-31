import axios from 'axios';

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    { headers: { authtoken } }
  );
};
