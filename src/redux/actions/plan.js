import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_PLAN_REQUEST,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_FAIL,
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAIL,
  EDIT_PLAN_REQUEST,
  EDIT_PLAN_SUCCESS,
  EDIT_PLAN_FAIL,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAIL,
  SELECT_PLAN_REQUEST,
  SELECT_PLAN_SUCCESS,
  SELECT_PLAN_FAIL,
} from "../const";

export const addPlan = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: ADD_PLAN_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/plan`,
      body,
      config
    );
    dispatch({
      type: ADD_PLAN_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_PLAN_FAIL,
    });
  }
};

export const editPlan = (data) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: EDIT_PLAN_REQUEST,
  });

  try {
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/plan/`,
      body,
      config
    );
    dispatch({
      type: EDIT_PLAN_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PLAN_FAIL,
    });
  }
};

export const deletePlan = (data) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: DELETE_PLAN_REQUEST,
  });

  try {
    const { _id } = data;
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/plan/delete/${_id}`,
      config
    );
    dispatch({
      type: DELETE_PLAN_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAN_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const loadPlan = () => async (dispatch) => {
  dispatch({
    type: FETCH_PLAN_REQUEST,
  });

  try {
    const res = await axios.get(`https://libidoonbackend.herokuapp.com/api/plan`);
    dispatch({
      type: FETCH_PLAN_SUCCESS,
      payload: res.data.plans,
    });

    dispatch(setAlert(`Exito`, "primary"));
  } catch (error) {
    dispatch({
      type: FETCH_PLAN_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const selectPlan = (data) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: SELECT_PLAN_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/plan/select`,
      body,
      config
    );
    dispatch({
      type: SELECT_PLAN_SUCCESS,
      payload: res.data.plan,
    });
  } catch (error) {
    dispatch({
      type: SELECT_PLAN_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};


