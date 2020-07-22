import axios from 'axios';
// import { setAlert } from './alert';
// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   USER_LOADED,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   CLEAR_PROFILE
// } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User


// Register User
export const register = async ({ name, email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  // dispatch({
  //   type: REGISTER_SUCCESS,
  //   payload: res.data,
  // });

  // dispatch(loadUser());
  try {
    const res = await axios.post('/api/users', body, config);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log('Errors: ' + error));
    };
    // dispatchEvent({
    //   type: REGISTER_FAIL,
    // });
  }
};

// Login User


// Logout / Clear Profiles