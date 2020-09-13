import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_UPDATED,
  USER_DELETED
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  // Check local store
  // Set header with token if there is one
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    
    dispatch(loadUser());
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profiles
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Edit user info
export const editUser = (name, email, currentPassword, newPassword) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, currentPassword, newPassword });
  
  try {
    const res = await axios.post('/api/users/editUser', body, config);

    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
  
    // dispatch(loadUser());

    dispatch(setAlert('User Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Delete User
export const deleteUser = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/users/deleteUser');

      dispatch({ type: USER_DELETED });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
