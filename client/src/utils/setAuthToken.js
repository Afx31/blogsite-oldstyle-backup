import api from './api';

const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;

// Function that takes in a token, IF the token is valid it'll add to the global header
// ELSE the auth will be deleted
// import axios from 'axios';
// import { AUTH_ERROR } from '../actions/types';
// import store from '../store';

// axios.interceptors.response.use(
//   res => res,
//   err => {
//     console.log(err.message);
//     if (err.message.includes('401')) store.dispatch({ type: AUTH_ERROR });
//   }
// );

// const setAuthToken = token => {
//   if (token) {
//     axios.defaults.headers.common['x-auth-token'] = token;
//     localStorage.setItem('token', token);
//   } else {
//     delete axios.defaults.headers.common['x-auth-token'];
//     localStorage.removeItem('token');
//   }
// };

// export default setAuthToken;