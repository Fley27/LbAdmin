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

const initialState = {
  challengeCategories: [],
  loading: true,
  challengeCategory: null,
  deleted: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_CHALLENGECATEGORY_REQUEST:
    case FETCH_CHALLENGECATEGORY_REQUEST:
    case ADD_CHALLENGECATEGORY_REQUEST:
    case DELETE_CHALLENGECATEGORY_REQUEST:
    case EDIT_CHALLENGECATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CHALLENGECATEGORY_SUCCESS:
      return {
        ...state,
        challengeCategories: payload,
        loading: true,
      };
    case DELETE_CHALLENGECATEGORY_SUCCESS:
      return {
        ...state,
        deleted: payload,
        loading: true,
      };
    case ADD_CHALLENGECATEGORY_SUCCESS:
    case SELECT_CHALLENGECATEGORY_SUCCESS:
    case EDIT_CHALLENGECATEGORY_SUCCESS:
      return {
        ...state,
        challengeCategory: payload,
        loading: true,
      };
    case FETCH_CHALLENGECATEGORY_FAIL:
    case SELECT_CHALLENGECATEGORY_FAIL:
    case ADD_CHALLENGECATEGORY_FAIL:
    case EDIT_CHALLENGECATEGORY_FAIL:
    case DELETE_CHALLENGECATEGORY_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
