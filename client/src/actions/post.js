import axios from 'axios';
import { ADD_POST, POST_ERROR } from '../actions/types';
// import { setAlert } from './alert';

// Add a Post
export const addPost = ({heading, car, formData}) => async (dispatch) => {
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