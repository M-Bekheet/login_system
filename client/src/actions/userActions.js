import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  GET_ERRORS,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from "../actions/types";

export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:8080/api/users/auth", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: returnErrors(err.response.data, err.response.status),
      });
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/*
 *** User Register
 */
export const register =
  ({ firstName, lastName, email, password }) =>
    (dispatch) => {

      dispatch({ type: USER_LOADING });

      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //converting `Request` body to string
      const body = JSON.stringify({ firstName, lastName, email, password });

      axios
        .post("http://localhost:8080/api/users/register", body, config)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
        })
        .catch(({ response }) => {
          dispatch(returnErrors(response.data, response.status, "Register Fail"));
          dispatch({
            type: REGISTER_FAIL,
          });
        });
    };

/*
 *** User Login
 */

export const login =
  ({ email, password }) =>
    (dispatch) => {

      dispatch({ type: USER_LOADING });
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //converting `Request` body to string
      const body = JSON.stringify({ email, password });

      axios
        .post("http://localhost:8080/api/users/login", body, config)
        .then((res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
        })
        .catch(({ response }) => {
          dispatch(returnErrors(response.data, response.status, "Login Fail"));
          dispatch({
            type: LOGIN_FAIL,
          });
        });
    };

/*
 *** Update Profile Data
 */
//
export const updateProfile = (userInfo) => (dispatch, getState) => {
  const body = JSON.stringify({ ...userInfo });

  dispatch({ type: USER_LOADING });

  axios
    .patch("http://localhost:8080/api/users", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(({ response }) => {
      dispatch(returnErrors(response.data, response.status, "Update Fail"));
      dispatch({
        type: UPDATE_FAIL,
      });
    });
};

/**
 * User Logut
 */
export const logout = () => ({ type: LOGOUT_SUCCESS });

/**
 * Token Config
 * Set Request headers and token
 */

export const tokenConfig = (getState) => {
  console.log("get state");
  console.log(getState());
  console.log("state", getState());
  const token = getState().user.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
