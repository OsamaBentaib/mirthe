import axios from "axios";
import fs from "fs";
import * as actionTypes from "./actionTypes";
import { PROXY_URL } from "./../constants/urls";
import { options } from "./../constants/token";
import { getUserQuery, profileQuery } from "../constants/queries";
import { connect } from "react-redux";

const getProfileSuccess = (payload) => {
  return {
    type: actionTypes.GET_PROFILE,
    payload: payload,
  };
};
export const getUserProfile = (ID) => {
  let body = {
    query: getUserQuery,
    variables: {
      ID: ID,
    },
  };
  return (dispatch) => {
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        const user = res.data.data.getUser;
        dispatch(getProfileSuccess(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const updateProfile = (fields) => {
  let body = {
    query: profileQuery,
    variables: {
      phone: fields.phone,
      lastName: fields.lastName,
      firstName: fields.firstName,
      location: fields.location,
      birthday: fields.birthday,
      avatar: fields.avatar,
    },
  };
  const token = localStorage.getItem("token");
  const header = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };

  return (dispatch) => {
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        const user = res.data.data.profile;
        dispatch(getProfileSuccess(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
