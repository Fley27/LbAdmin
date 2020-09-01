import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_CHALLENGESETTINGS_REQUEST,
  FETCH_CHALLENGESETTINGS_SUCCESS,
  FETCH_CHALLENGESETTINGS_FAIL,
  ADD_CHALLENGESETTINGS_REQUEST,
  ADD_CHALLENGESETTINGS_SUCCESS,
  ADD_CHALLENGESETTINGS_FAIL,
} from "../const";

export const addChallengeSettings = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: ADD_CHALLENGESETTINGS_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/challengeSettings`,
      body,
      config
    );
    dispatch({
      type: ADD_CHALLENGESETTINGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHALLENGESETTINGS_FAIL,
    });
  }
};


export const loadChallengeSettings = () => async (dispatch) => {
  dispatch({
    type: FETCH_CHALLENGESETTINGS_REQUEST,
  });

  try {
    const res = await axios.get(`https://libidoonbackend.herokuapp.com/api/challengeSettings`);
    dispatch({
      type: FETCH_CHALLENGESETTINGS_SUCCESS,
      payload: res.data.challengeSettings,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHALLENGESETTINGS_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

