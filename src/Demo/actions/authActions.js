import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LOAD_ASSOC_BRANCHES,
  TOGGLE_BRANCH,
} from "../../store/actions";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("https://libidoonbackend.herokuapp.com/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  console.log("login fired");

  axios
    .post("https://libidoonbackend.herokuapp.com/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      console.log(res);
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  console.log("logging out with action");
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const branchfetcher = (userData) => (dispatch) => {
  axios
    .post("https://libidoonbackend.herokuapp.com/api/branch/branchfetcher", userData)
    .then((res) =>
      dispatch({
        type: LOAD_ASSOC_BRANCHES,
        payload: res.data,
      })
    );
};

export const togglebranches = (userData, history) => (dispatch) => {
  axios
    .post("https://libidoonbackend.herokuapp.com/api/branch/togglebranches", userData)
    .then((res) =>
      dispatch({
        type: TOGGLE_BRANCH,
        payload: res.data,
      })
    );
};
