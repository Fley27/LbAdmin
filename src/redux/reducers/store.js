import {
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  ADD_STORE_FAIL,
  EDIT_STORE_REQUEST,
  EDIT_STORE_SUCCESS,
  EDIT_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  SELECT_STORE_REQUEST,
  SELECT_STORE_SUCCESS,
  SELECT_STORE_FAIL,
} from "../const";

const initialState = {
    cards: [],
    loading: true,
    card: null,
    deleted: false,
    added: false,
    edited: false,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SELECT_STORE_REQUEST:
      case FETCH_STORE_REQUEST:
      case ADD_STORE_REQUEST:
      case DELETE_STORE_REQUEST:
      case EDIT_STORE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_STORE_SUCCESS:
        return {
          ...state,
          cards: payload,
          added: false,
              edited: false,
              deleted: false,
          loading: true,
        };
      case DELETE_STORE_SUCCESS:
        return {
          ...state,
          deleted: payload,
          added: false,
          edited: false,
          loading: true,
        };
      case ADD_STORE_SUCCESS:
        return {
          ...state,
          added: payload,
          edited: false,
          deleted: false,
          loading: true,
        };
        case EDIT_STORE_SUCCESS:
            return {
              ...state,
              edited: payload,
              added: false,
              deleted: false,
              loading: true,
            };
        case SELECT_STORE_SUCCESS:
            return {
              ...state,
              card: payload,
              loading: true,
            };
      case FETCH_STORE_FAIL:
      case SELECT_STORE_FAIL:
      case ADD_STORE_FAIL:
      case EDIT_STORE_FAIL:
      case DELETE_STORE_FAIL:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  