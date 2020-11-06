import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROXY_URL } from "./../constants/urls";
import { options } from "./../constants/token";
import {
  postsQuery,
  createCommentQuery,
  createPostQuery,
  createReactionQuery,
  getUsersPostsQuery,
} from "./../constants/queries";

const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START,
  };
};
const fetchPostsSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: payload,
  };
};
const fetchPostsFail = (err) => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    err: err,
  };
};
export const fetchPosts = (userId, start, limit) => {
  let body;
  if (userId)
    body = {
      query: getUsersPostsQuery,
      variables: {
        start: start,
        limit: limit,
        userId: userId,
      },
    };
  else
    body = {
      query: postsQuery,
      variables: {
        start: start,
        limit: limit,
      },
    };
  return (dispatch) => {
    dispatch(fetchPostsStart());
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        const posts = res.data.data.getPosts;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchPostsFail());
      });
  };
};
/**
 * ==============
 *  CREATE POST
 * ==============
 */
const createPostStart = () => {
  return {
    type: actionTypes.CREATE_POST_START,
  };
};
const createPostSuccess = (payload) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    payload: payload,
  };
};
const createPostFail = (err) => {
  return {
    type: actionTypes.CREATE_POST_FAIL,
    err: err,
  };
};
export const createPost = (content, image) => {
  let body = {
    query: createPostQuery,
    variables: {
      content: content,
      Image: image,
    },
  };
  console.log(body);
  return (dispatch) => {
    dispatch(createPostStart());
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        const post = res.data.data.createPost;
        dispatch(createPostSuccess(post));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createPostFail());
      });
  };
};
/**
 * =======================
 *   POST NEW COMMENT!
 * =======================
 *
 */
const createNewCommentStart = (postId) => {
  return {
    type: actionTypes.CREATE_NEW_COMMENT_START,
    postId: postId,
  };
};
const createNewCommentSuccess = (payload, postId) => {
  return {
    type: actionTypes.CREATE_NEW_COMMENT_SUCCESS,
    payload: payload,
    postId: postId,
  };
};
const createNewCommentFail = (err) => {
  return {
    type: actionTypes.CREATE_NEW_COMMENT_FAIL,
    err: err,
  };
};
export const createNewComment = (content, postId) => {
  let body = {
    query: createCommentQuery,
    variables: {
      content: content,
      postId: postId,
    },
  };
  console.log(body);
  return (dispatch) => {
    dispatch(createNewCommentStart(postId));
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        const comment = res.data.data.createComment;
        dispatch(createNewCommentSuccess(comment, postId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createNewCommentFail());
      });
  };
};

/**
 * =======================
 *   POST REACTION !
 * =======================
 *
 */
export const createReaction = (content, postId) => {
  let body = {
    query: createReactionQuery,
    variables: {
      content: content,
      postId: postId,
    },
  };
  console.log(body);
  return (dispatch) => {
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
