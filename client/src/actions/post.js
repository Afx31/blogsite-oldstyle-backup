import axios from 'axios';
import { GET_POST_NAME, GET_POST, ADD_POST, POST_ERROR } from '../actions/types';
import { setAlert } from './alert';

// Get latest Post ID for specific car to load that car's page
export const getLinksFirstPostId = async (car) => {
  try {
    const res = await axios.get(`/api/posts/firstPostId/${car}`);
    return res.data[0]._id;
  } catch (err) {
    console.error(err.message);
  };
};

// Get All Post ID's/Headings for specific car
export const getPostsByCar = (car) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/postsByCar/${car}`);

    dispatch({
      type: GET_POST_NAME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  };
};

// Get Post by ID
export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/getPostById/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add a Post
export const addPost = (heading, car, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({heading, car, formData});

  try {
    const res = await axios.post('/api/posts/add-post', body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};