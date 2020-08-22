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

const initialState = {
  challengeTypes: [],
  loading: true,
  challengeType: null,
  deleted: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_CHALLENGETYPE_REQUEST:
    case FETCH_CHALLENGETYPE_REQUEST:
    case ADD_CHALLENGETYPE_REQUEST:
    case DELETE_CHALLENGETYPE_REQUEST:
    case EDIT_CHALLENGETYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CHALLENGETYPE_SUCCESS:
      return {
        ...state,
        challengeTypes: payload,
        loading: true,
      };
    case DELETE_CHALLENGETYPE_SUCCESS:
      return {
        ...state,
        deleted: payload,
        loading: true,
      };
    case ADD_CHALLENGETYPE_SUCCESS:
    case SELECT_CHALLENGETYPE_SUCCESS:
    case EDIT_CHALLENGETYPE_SUCCESS:
      return {
        ...state,
        challengeType: payload,
        loading: true,
      };
    case FETCH_CHALLENGETYPE_FAIL:
    case SELECT_CHALLENGETYPE_FAIL:
    case ADD_CHALLENGETYPE_FAIL:
    case EDIT_CHALLENGETYPE_FAIL:
    case DELETE_CHALLENGETYPE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
