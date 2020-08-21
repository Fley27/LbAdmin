import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_LEAVES,
  GET_COACH_VIEW2,
  GET_SUCCESS,
} from "../../store/actions";
import axios from "axios";
export const get_coach_view2 = () => {
  return {
    type: GET_COACH_VIEW2,
  };
};
export const get_coach_view2_axios = () => (dispatch) => {
  axios.post("http://localhost:5000/api/coach/viewcoach").then((res) =>
    dispatch({
      type: GET_COACH_VIEW2,
      payload: res.data,
    })
  );
};
export const registerCoach = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/coach/coachregister", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteCoach = (delId, history) => (dispatch) => {
  const success = { success: "success" };
  axios
    .post("http://localhost:5000/api/coach/deletecoach", delId)
    .then((response) => {
      return {
        type: GET_SUCCESS,
        payload: response.data,
      };
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setleave = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/setleave", userData)
    .then((response) => {
      return {
        type: GET_SUCCESS,
        payload: response.data,
      };
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const get_leaves = (userData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/get_leaves", userData)
    .then((res) =>
      dispatch({
        type: FETCH_LEAVES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const get_all_leaves = (userData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/get_all_leaves", userData)
    .then((res) =>
      dispatch({
        type: FETCH_LEAVES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
