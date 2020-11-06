import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROXY_URL } from "../constants/urls";
import { options } from "../constants/token";
import { getFollowsQuery } from "../constants/queries";

const success = (payload) => {
  return {
    type: actionTypes.GET_FOLLOWS,
    payload: payload,
  };
};
export const getFollows = (rel, userId, start, limit) => {
  let body = {
    query: getFollowsQuery,
    variables: {
      rel: rel,
      start: start,
      limit: limit,
      userId: userId,
    },
  };
  return (dispatch) => {
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        const follows = res.data.data.getFollows;
        dispatch(success(follows));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
