import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_CHALLENGECATEGORY_REQUEST,
  FETCH_CHALLENGECATEGORY_SUCCESS,
  FETCH_CHALLENGECATEGORY_FAIL,
  ADD_CHALLENGECATEGORY_REQUEST,
  ADD_CHALLENGECATEGORY_SUCCESS,
  ADD_CHALLENGECATEGORY_FAIL,
  EDIT_CHALLENGECATEGORY_REQUEST,
  EDIT_CHALLENGECATEGORY_SUCCESS,
  EDIT_CHALLENGECATEGORY_FAIL,
  DELETE_CHALLENGECATEGORY_REQUEST,
  DELETE_CHALLENGECATEGORY_SUCCESS,
  DELETE_CHALLENGECATEGORY_FAIL,
  SELECT_CHALLENGECATEGORY_REQUEST,
  SELECT_CHALLENGECATEGORY_SUCCESS,
  SELECT_CHALLENGECATEGORY_FAIL,
} from "../const";

export const addChallengeCategory = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: ADD_CHALLENGECATEGORY_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challengeCategory`,
      body,
      config
    );
    dispatch({
      type: ADD_CHALLENGECATEGORY_SUCCESS,
      payload: res.data.challengeCategory,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHALLENGECATEGORY_FAIL,
    });
  }
};

export const editChallengeCategory = (challengeCategoryData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeCategoryData);
  dispatch({
    type: EDIT_CHALLENGECATEGORY_REQUEST,
  });

  try {
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/challengeCategory`,
      body,
      config
    );
    dispatch({
      type: EDIT_CHALLENGECATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CHALLENGECATEGORY_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const deleteChallengeCategory = (challengeCategoryData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: DELETE_CHALLENGECATEGORY_REQUEST,
  });

  try {
    const { _id } = challengeCategoryData;
    const res = await axios.delete(
      `https://libidoonbackend.herokuapp.com/api/challengeCategory/${_id}`,
      config
    );
    dispatch({
      type: DELETE_CHALLENGECATEGORY_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHALLENGECATEGORY_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const loadChallengeCategory = () => async (dispatch) => {
  dispatch({
    type: FETCH_CHALLENGECATEGORY_REQUEST,
  });

  try {
    const res = await axios.get(`https://libidoonbackend.herokuapp.com/api/challengeCategory`);
    dispatch({
      type: FETCH_CHALLENGECATEGORY_SUCCESS,
      payload: res.data.challengeCategories,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHALLENGECATEGORY_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const selectChallengeCategory = (challengeCategoryData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeCategoryData);
  dispatch({
    type: SELECT_CHALLENGECATEGORY_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challengeCategory/select`,
      body,
      config
    );
    dispatch({
      type: SELECT_CHALLENGECATEGORY_SUCCESS,
      payload: res.data.challengeCategory,
    });
  } catch (error) {
    dispatch({
      type: SELECT_CHALLENGECATEGORY_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};
