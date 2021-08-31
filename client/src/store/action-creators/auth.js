import axios from 'axios';
import { apiCallStart, apiCallSuccess, apiCallFail } from './';
import { actionType } from '../action-types';

export const loginUser = (response, authtoken) => ({
  type: actionType.LOGIN,
  payload: {
    name: response.data.name,
    email: response.data.email,
    token: authtoken,
    role: response.data.role,
    _id: response.data._id,
  },
});

export const logoutUser = () => ({
  type: actionType.LOGOUT,
  payload: null,
});

export const createOrUpdateUser = (authtoken) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        { headers: { authtoken } }
      );

      dispatch(apiCallSuccess());
      dispatch(loginUser(response, authtoken));
    } catch (error) {
      console.log('Auth reducer error: ', error);
      dispatch(apiCallFail('Something went wrong'));
    }
  };
};
