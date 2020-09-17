import api from '../utils/api';
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

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    
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
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post('/users/register', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
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
  // const body = JSON.stringify({ email, password });
  const body = { email, password };

  try {
    const res = await api.post('/auth/login', body);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
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
export const logout = () => ({ type: LOGOUT });

// Edit user info
export const editUser = (name, email, currentPassword, newPassword) => async (dispatch) => {
  const body = JSON.stringify({ name, email, currentPassword, newPassword });
  
  try {
    const res = await api.post('/users/editUser', body);

    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
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
      await api.delete('/users/deleteUser');

      dispatch({ type: USER_DELETED });
      dispatch(setAlert('Your account has been permanently deleted', 'success'));
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
