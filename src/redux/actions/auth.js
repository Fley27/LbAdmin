import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  LOG_IN_FAIL,
  LOG_IN_SUCCESS,
} from "../const";
import { setAlert } from "./alert";

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );
    console.log(res);
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(` Error registering ${error}`);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: LOG_IN_FAIL,
    });
  }
};
//register user
export const loadUser = (decoded) => {
  return {
    type: USER_LOADED,
    payload: decoded,
  };
};
