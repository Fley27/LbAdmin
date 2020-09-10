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
    dispatch(setAlert('Welcome to the panel admin.', ""));
    
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: res.data,
    });
   
  } catch (error) {
    dispatch({
      type: LOG_IN_FAIL,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};
//register user
export const loadUser = (decoded) => {
  return {
    type: REGISTER_SUCCESS,
    payload: decoded,
  };
};
