import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LOAD_ASSOC_BRANCHES,
  TOGGLE_BRANCH,
  GET_FEE_BATCH_DETAILS,
  SELECT_CHILD_BATCH,
  GET_BATCH_DETAILS,
  LOAD_CHILDS,
  STUDENT_PROFILE,
  SELECT_CHILD,
} from "../../store/actions";

// Register User
export const getchildren = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/getchildren", userData)
    .then((res) =>
      dispatch({
        type: LOAD_CHILDS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
export const togglewards = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/togglewards", userData)
    .then((res) =>
      dispatch({
        type: SELECT_CHILD,
        payload: res.data,
      })
    );
};

export const getstudprofile = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/getstudprofile", userData)
    .then((res) =>
      dispatch({
        type: STUDENT_PROFILE,
        payload: res.data,
      })
    );
};
export const toggleparentbatch = (userData, history) => (dispatch) => {
  console.log("toggling batch");
  axios
    .post("http://localhost:5000/api/users/toggleparentbatch", userData)
    .then((res) =>
      dispatch(
        {
          type: SELECT_CHILD_BATCH,
          payload: res.data,
        } /* ,console.log(res.data) */
      )
    );
};
export const fetchbatchdetails = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/fetchbatchdetails", userData)
    .then((res) =>
      dispatch({
        type: GET_BATCH_DETAILS,
        payload: res.data,
      })
    );
};
export const get_feesdetail = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/get_feesdetail", userData)
    .then((res) =>
      dispatch(
        {
          type: GET_FEE_BATCH_DETAILS,
          payload: res.data,
        },
        console.log("data for fee details", res.data)
      )
    );
};
