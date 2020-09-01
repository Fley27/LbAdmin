import {
    FETCH_CHALLENGESETTINGS_REQUEST,
    FETCH_CHALLENGESETTINGS_SUCCESS,
    FETCH_CHALLENGESETTINGS_FAIL,
    ADD_CHALLENGESETTINGS_REQUEST,
    ADD_CHALLENGESETTINGS_SUCCESS,
    ADD_CHALLENGESETTINGS_FAIL,
  } from "../const";
  
  const initialState = {
    challengeSettings: null,
    added: false,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case FETCH_CHALLENGESETTINGS_REQUEST:
      case ADD_CHALLENGESETTINGS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CHALLENGESETTINGS_SUCCESS:
        return {
          ...state,
          challengeSettings: payload,
          added: false,
          loading: true,
        };
      case  ADD_CHALLENGESETTINGS_SUCCESS :
        return {
          ...state,
          challengeSettings: payload.challengeSettings,
          added: payload.success,
          loading: true,
        };
      case FETCH_CHALLENGESETTINGS_FAIL:
      case ADD_CHALLENGESETTINGS_FAIL:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  