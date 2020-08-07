import {
  GET_POST,
  ADD_POST,
  GET_POST_NAME,
  POST_ERROR
} from '../actions/types';

const initialState = {
  posts: [],
  singlePost: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_NAME:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        singlePost: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        singlePost: [payload, ...state.posts],
        loading: false
      };
    default:
      return state;
  };
};