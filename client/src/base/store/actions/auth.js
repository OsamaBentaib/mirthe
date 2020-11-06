import axios from "axios";
import * as actionTypes from "./actionTypes";
import { PROXY_URL } from "./../constants/urls";
import { loginQuery } from "../constants/queries";
import { options } from "./../constants/token";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  let body = {
    query: loginQuery,
    variables: {
      username: username,
      password: password,
    },
  };
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(body);
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          dispatch(authFail("Opps Something wont wrong!"));
        }
        const token = res.data.data.login.token;
        const user = {
          username: res.data.data.login.username,
          _id: res.data.data.login._id,
          profile: res.data.data.login.profile,
        };
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        window.location.href = "/";
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password, confirmPassword) => {
  let body = {
    query: `
          mutation register(
            $username: String!, 
            $email: String!, 
            $password: String!, 
            $confirmPassword: String!
            ) {
            register(
              username: $username, 
              email: $email, 
              password: $password,
              confirmPassword: $confirmPassword
              ) 
              {
                token
              }
          }
        `,
    variables: {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    },
  };
  console.log(body);
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          window.location.href = "/login/";
        }
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  let body = {
    query: `
          query {
            authCheck
          }
        `,
  };
  return (dispatch) => {
    const token = localStorage.getItem("token");
    axios
      .post(PROXY_URL, body, options)
      .then((res) => {
        console.log(res.data.data);
        if (!res.data.data.authCheck && token) {
          dispatch(logout());
        }
      })
      .catch((err) => {
        dispatch(logout());
      });
  };
};
