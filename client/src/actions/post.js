import axios from 'axios';
import { ADD_POST, POST_ERROR } from '../actions/post';
// import { setAlert } from './alert';

// Add a Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts/add-post', formData, config);

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