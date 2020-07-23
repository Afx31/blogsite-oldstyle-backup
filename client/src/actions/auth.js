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
//import setAuthToken from '../utils/setAuthToken';

// Load User


// Register User
export const register = async ({ name, email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    await axios.post('/api/users/register', body, config);
    console.log('User has been registered');  
    return 'success';
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log('Errors: ' + error));
    };
  }
};

// Login User
export const login = async ( email, password ) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    await axios.post('/api/auth/login', body, config);
    return 'success';
  } catch (err) {
    //
    // REWORK WITH REDUX?
    //
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log('Errors: ' + error));
    };
  }
};


// Logout / Clear Profiles