import axios from 'axios';
import { GET_POST_NAME, GET_POST, ADD_POST, POST_ERROR, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';
import { setAlert } from './alert';

// GET latest Post ID for specific car to load that car's page
export const getLinksFirstPostId = async (car) => {
  try {
    const res = await axios.get(`/api/posts/firstPostId/${car}`);
    return res.data[0]._id;
  } catch (err) {
    console.error(err.message);
  };
};

// GET Post by ID
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

// GET All Post ID's/Headings for specific car
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

// GET Post bio data for homepage
export const getPostBio = async () => {
  try {
    const res = await axios.get('/api/posts/getPostBio');

    console.log('action:');
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log('Error' + err);
  }
};

// ADD a Post
export const addPost = (heading, car, thumbnail, description, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({heading, car, thumbnail, description, formData});

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
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ADD Comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const res = await axios.post(`/api/posts/addComment/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// DELETE Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/deleteComment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
};