import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  SELECT_USER_REQUEST,
  SELECT_USER_SUCCESS,
  SELECT_USER_FAIL,
  EDIT_COINS_REQUEST,
  EDIT_COINS_SUCCESS,
  EDIT_COINS_FAIL,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../const";

const initialState = {
  users: [],
  loading: true,
  user: null,
  blocked: false,
  deleted: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_USER_REQUEST:
    case BLOCK_USER_REQUEST:
    case FETCH_USER_REQUEST:
    case ADD_USER_REQUEST:
    case EDIT_COINS_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case BLOCK_USER_SUCCESS:
      return {
        ...state,
        blocked: payload,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleted: payload,
        loading: true,
      };
    case SELECT_USER_SUCCESS:
    case EDIT_COINS_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: true,
      };
    case FETCH_USER_FAIL:
    case SELECT_USER_FAIL:
    case ADD_USER_FAIL:
    case EDIT_COINS_FAIL:
    case BLOCK_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
