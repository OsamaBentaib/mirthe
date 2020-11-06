import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  posts: [],
  error: null,
  loading: true,
  newComment: {
    loading: false,
    data: [],
  },
  newPosts: {
    loading: false,
    data: [],
  },
};
/**
 * ===========
 *  For Posts
 * ===========
 */
const fetchPostsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const fetchPostsSuccess = (state, action) => {
  console.log(action.payload[0]);
  return updateObject(state, {
    loading: false,
    posts: action.payload,
    error: null,
  });
};
const fetchPostsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.err,
  });
};
/**
 * ===============
 *  For New Posts
 * ===============
 */
const createPostStart = (state, action) => {
  const newPosts = {
    loading: true,
    data: state.newPosts.data,
  };
  return updateObject(state, {
    newComment: newPosts,
  });
};
const createPostSuccess = (state, action) => {
  const data = state.newPosts.data;
  data.push(action.payload);
  const newPosts = {
    loading: true,
    data: data,
  };
  return updateObject(state, {
    newPosts: newPosts,
  });
};
const createPostFail = (state, action) => {
  const newPosts = {
    loading: true,
    err: action.err,
    data: state.newPosts.data,
  };
  return updateObject(state, {
    newPosts: newPosts,
  });
};
/**
 * ============
 * for comments
 * ==============
 */
const createCommentStart = (state, action) => {
  const newComment = {
    loading: true,
    data: state.newComment.data,
  };
  return updateObject(state, {
    newComment: newComment,
  });
};
const createCommentSuccess = (state, action) => {
  const oldData = state.newComment.data;
  const myPush = {
    ...action.payload,
    postId: action.postId,
  };
  oldData.push(myPush);
  const newComment = {
    loading: false,
    data: oldData,
  };
  console.log(newComment);
  return updateObject(state, {
    newComment: newComment,
  });
};
const createCommentFail = (state, action) => {
  const newComment = {
    loading: false,
    postId: action.postId,
  };
  return updateObject(state, {
    newComment: newComment,
  });
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.FETCH_POSTS_FAIL:
      return fetchPostsFail(state, action);
    case actionTypes.CREATE_POST_START:
      return createPostStart(state, action);
    case actionTypes.CREATE_POST_SUCCESS:
      return createPostSuccess(state, action);
    case actionTypes.CREATE_POST_FAIL:
      return createPostFail(state, action);
    case actionTypes.CREATE_NEW_COMMENT_START:
      return createCommentStart(state, action);
    case actionTypes.CREATE_NEW_COMMENT_SUCCESS:
      return createCommentSuccess(state, action);
    case actionTypes.CREATE_NEW_COMMENT_FAIL:
      return createCommentFail(state, action);
    default:
      return state;
  }
};

export default postsReducer;
