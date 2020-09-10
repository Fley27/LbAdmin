import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_FAIL,
  ADD_CHALLENGE_REQUEST,
  ADD_CHALLENGE_SUCCESS,
  ADD_CHALLENGE_FAIL,
  EDIT_CHALLENGE_REQUEST,
  EDIT_CHALLENGE_SUCCESS,
  EDIT_CHALLENGE_FAIL,
  DELETE_CHALLENGE_REQUEST,
  DELETE_CHALLENGE_SUCCESS,
  DELETE_CHALLENGE_FAIL,
  SELECT_CHALLENGE_REQUEST,
  SELECT_CHALLENGE_SUCCESS,
  SELECT_CHALLENGE_FAIL,
} from "../const";

export const addChallenge = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: ADD_CHALLENGE_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challenge`,
      body,
      config
    );
    dispatch({
      type: ADD_CHALLENGE_SUCCESS,
      payload: res.data.challenge,
    });
    dispatch(setAlert(`It's saved successly.`, ""));
  } catch (error) {
    dispatch({
      type: ADD_CHALLENGE_FAIL,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const editChallenge = (challengeData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeData);
  dispatch({
    type: EDIT_CHALLENGE_REQUEST,
  });

  try {
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/challenge/`,
      body,
      config
    );
    dispatch({
      type: EDIT_CHALLENGE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(`It's editef successly.`, ""));
  } catch (error) {
    dispatch({
      type: EDIT_CHALLENGE_FAIL,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const deleteChallenge = (challengeData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: DELETE_CHALLENGE_REQUEST,
  });

  try {
    const { _id } = challengeData;
    const res = await axios.delete(
      `https://libidoonbackend.herokuapp.com/api/challenge/${_id}`,
      config
    );
    dispatch({
      type: DELETE_CHALLENGE_SUCCESS,
      payload: res.data.success,
    });
    dispatch(setAlert(`It's deleted successly.`, ""));
  } catch (error) {
    dispatch({
      type: DELETE_CHALLENGE_FAIL,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const loadChallenge = () => async (dispatch) => {
  dispatch({
    type: FETCH_CHALLENGE_REQUEST,
  });

  try {
    const res = await axios.get(`https://libidoonbackend.herokuapp.com/api/challenge`);
    dispatch({
      type: FETCH_CHALLENGE_SUCCESS,
      payload: res.data.challenges,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHALLENGE_FAIL,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const selectChallenge = (challengeData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(challengeData);
  dispatch({
    type: SELECT_CHALLENGE_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challenge/select`,
      body,
      config
    );
    dispatch({
      type: SELECT_CHALLENGE_SUCCESS,
      payload: res.data.challenge,
    });
  } catch (error) {
    dispatch({
      type: SELECT_CHALLENGE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};


