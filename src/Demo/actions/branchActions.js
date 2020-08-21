import {
  LOAD_BRANCHES,
  SUBMIT_FEEDBACK,
  VIEW_FEEBACK,
  VIEW_PARENT_FEEDBACK,
  APPROVE_AND_PUBLISH_FEEDBACK,
  GET_ERRORS,
  SELECT_COACH_BATCH,
  SET_CURRENT_USER,
  USER_LOADING,
  SELECT_CHILD_BATCH,
  GET_COACH_VIEW2,
  VIEW_BATCH_STUDENTS,
  VIEW_TT,
  GET_SUCCESS,
  LOAD_BATCHES,
} from "../../store/actions";
import axios from "axios";

export const get_branches = () => (dispatch) => {
  axios.post("http://localhost:5000/api/branch/viewbranch").then((res) =>
    dispatch({
      type: LOAD_BRANCHES,
      payload: res.data,
    })
  );
};

export const get_batches = () => (dispatch) => {
  axios.post("http://localhost:5000/api/branch/viewbatch").then((res) =>
    dispatch({
      type: LOAD_BATCHES,
      payload: res.data,
    })
  );
};
export const registerBranch = (userData, history) => (dispatch) => {
  const success = { success: "success" };
  axios
    .post("http://localhost:5000/api/branch/createbranch", userData)
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
export const registerBatch = (userData, history) => (dispatch) => {
  const success = { success: "success" };
  axios
    .post("http://localhost:5000/api/branch/createbatch", userData)
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
export const deleteBranch = (delId, history) => (dispatch) => {
  const success = { success: "success" };
  axios
    .post("http://localhost:5000/api/branch/deletebranch", delId)
    .then()
    .catch((err) => console.log(err));
};
export const deleteBatch = (delId, history) => (dispatch) => {
  const success = { success: "success" };
  axios
    .post("http://localhost:5000/api/branch/deletebatch", delId)
    .then(/* response => {
      return ({
        type: GET_SUCCESS,
        payload: response.data
      });
    } */)
    .catch(
      (err) => console.log(err)

      /* dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }) */
    );
};
export const admissionProc = (userData, obj) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/branch/admissionproc", userData)
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const settt = (userData, history) => (dispatch) => {
  console.log("hello ?");

  axios
    .post("http://localhost:5000/api/ttnatt/settt", userData)
    .then(/* history.push("/login") */)
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const viewtt = (userData) => (dispatch) => {
  console.log("helllo in api view tt ?");

  axios
    .post("http://localhost:5000/api/ttnatt/viewtt", userData)
    .then((res) =>
      dispatch({
        type: VIEW_TT,
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
export const viewalltt = (userData) => (dispatch) => {
  console.log("helllo in api view tt ?");

  axios
    .post("http://localhost:5000/api/ttnatt/viewalltt", userData)
    .then((res) =>
      dispatch({
        type: VIEW_TT,
        payload: res.data.user,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const togglecoachbatch = (userData, history) => (dispatch) => {
  return axios
    .post(
      "http://localhost:5000/api/users/togglecoachbatch",
      userData
    )
    .then((res) =>
      dispatch(
        {
          type: SELECT_COACH_BATCH,
          payload: res.data,
        } /* ,console.log(res.data) */
      )
    );
};

export const viewbatchstudents = (userData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/ttnatt/viewbatchstudents", userData)
    .then((res) =>
      dispatch({
        type: VIEW_BATCH_STUDENTS,
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
export const viewallfeedback = (userData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/viewallfeedback", userData)
    .then((res) =>
      dispatch({
        type: VIEW_FEEBACK,
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

export const saveatt = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/ttnatt/saveatt", userData)
    .then(history.push("/dashboard/schedule"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
