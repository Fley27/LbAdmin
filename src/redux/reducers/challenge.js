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
  
  const initialState = {
    challenges: [],
    loading: true,
    challenge: null,
    deleted: false,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SELECT_CHALLENGE_REQUEST:
      case FETCH_CHALLENGE_REQUEST:
      case ADD_CHALLENGE_REQUEST:
      case DELETE_CHALLENGE_REQUEST:
      case EDIT_CHALLENGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CHALLENGE_SUCCESS:
        return {
          ...state,
          challenges: payload,
          loading: true,
        };
      case DELETE_CHALLENGE_SUCCESS:
        return {
          ...state,
          deleted: payload,
          loading: true,
        };
      case ADD_CHALLENGE_SUCCESS:
      case SELECT_CHALLENGE_SUCCESS:
      case EDIT_CHALLENGE_SUCCESS:
        return {
          ...state,
          challenge: payload,
          loading: true,
        };
      case FETCH_CHALLENGE_FAIL:
      case SELECT_CHALLENGE_FAIL:
      case ADD_CHALLENGE_FAIL:
      case EDIT_CHALLENGE_FAIL:
      case DELETE_CHALLENGE_FAIL:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  