import axios from 'axios';
import { GET_POSTS, GET_POST, ADD_POST, POST_ERROR } from '../actions/types';
// import { setAlert } from './alert';

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

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
// export const addPost = async (heading, car, formData) =>   {
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

    // dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};