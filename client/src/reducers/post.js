import {
  GET_POST,
  ADD_POST,
  GET_POST_NAME,
  POST_ERROR,
  ADD_COMMENT,
  REMOVE_COMMENT
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
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  };
};