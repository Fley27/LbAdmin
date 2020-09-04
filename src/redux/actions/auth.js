import axios from "axios";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
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
  dispatch({
    type:  USER_LOADED,
  });
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "https://libidoonbackend.herokuapp.com/api/auth",
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
    type: REGISTER_SUCCESS,
    payload: decoded,
  };
};
