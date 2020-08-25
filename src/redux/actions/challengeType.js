import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_CHALLENGETYPE_REQUEST,
  FETCH_CHALLENGETYPE_SUCCESS,
  FETCH_CHALLENGETYPE_FAIL,
  ADD_CHALLENGETYPE_REQUEST,
  ADD_CHALLENGETYPE_SUCCESS,
  ADD_CHALLENGETYPE_FAIL,
  EDIT_CHALLENGETYPE_REQUEST,
  EDIT_CHALLENGETYPE_SUCCESS,
  EDIT_CHALLENGETYPE_FAIL,
  DELETE_CHALLENGETYPE_REQUEST,
  DELETE_CHALLENGETYPE_SUCCESS,
  DELETE_CHALLENGETYPE_FAIL,
  SELECT_CHALLENGETYPE_REQUEST,
  SELECT_CHALLENGETYPE_SUCCESS,
  SELECT_CHALLENGETYPE_FAIL,
} from "../const";

export const addChallengeType = (challengeTypeData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeTypeData);
  dispatch({
    type: ADD_CHALLENGETYPE_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challengeType`,
      body,
      config
    );
    dispatch({
      type: ADD_CHALLENGETYPE_SUCCESS,
      payload: res.data.challengeType,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHALLENGETYPE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const editChallengeType = (challengeTypeData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeTypeData);
  dispatch({
    type: EDIT_CHALLENGETYPE_REQUEST,
  });

  try {
    const { id } = challengeTypeData;
    const params = id;
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/challengeType/${params}`,
      body,
      config
    );
    dispatch({
      type: EDIT_CHALLENGETYPE_SUCCESS,
      payload: res.data.challengeType,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CHALLENGETYPE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const deleteChallengeType = (challengeTypeData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: DELETE_CHALLENGETYPE_REQUEST,
  });

  try {
    const { _id } = challengeTypeData;
    const res = await axios.delete(
      `https://libidoonbackend.herokuapp.com/api/challengeType/${_id}`,

      config
    );
    dispatch({
      type: DELETE_CHALLENGETYPE_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHALLENGETYPE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const loadChallengeType = () => async (dispatch) => {
  dispatch({
    type: FETCH_CHALLENGETYPE_REQUEST,
  });

  try {
    const res = await axios.get(`https://libidoonbackend.herokuapp.com/api/challengeType`);
    dispatch({
      type: FETCH_CHALLENGETYPE_SUCCESS,
      payload: res.data.challengeTypes,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHALLENGETYPE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const selectChallengeType = (challengeTypeData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeTypeData);
  dispatch({
    type: SELECT_CHALLENGETYPE_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challengeType/select`,
      body,
      config
    );
    dispatch({
      type: SELECT_CHALLENGETYPE_SUCCESS,
      payload: res.data.challengeType,
    });
  } catch (error) {
    dispatch({
      type: SELECT_CHALLENGETYPE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};
