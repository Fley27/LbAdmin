import {
  FETCH_PLAN_REQUEST,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_FAIL,
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAIL,
  EDIT_PLAN_REQUEST,
  EDIT_PLAN_SUCCESS,
  EDIT_PLAN_FAIL,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAIL,
  SELECT_PLAN_REQUEST,
  SELECT_PLAN_SUCCESS,
  SELECT_PLAN_FAIL,
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
    case SELECT_PLAN_REQUEST:
    case FETCH_PLAN_REQUEST:
    case ADD_PLAN_REQUEST:
    case DELETE_PLAN_REQUEST:
    case EDIT_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PLAN_SUCCESS:
      return {
        ...state,
        cards: payload,
        added: false,
              edited: false,
              deleted: false,
        loading: true,
      };
    case DELETE_PLAN_SUCCESS:
      return {
        ...state,
        deleted: payload,
        added: false,
        edited: false,
        loading: true,
      };
    case ADD_PLAN_SUCCESS:
      return {
        ...state,
        added: payload,
        edited: false,
        deleted: false,
        loading: true,
      };
      case EDIT_PLAN_SUCCESS:
          return {
            ...state,
            edited: payload,
            added: false,
            deleted: false,
            loading: true,
          };
      case SELECT_PLAN_SUCCESS:
          return {
            ...state,
            card: payload,
            loading: true,
          };
    case FETCH_PLAN_FAIL:
    case SELECT_PLAN_FAIL:
    case ADD_PLAN_FAIL:
    case EDIT_PLAN_FAIL:
    case DELETE_PLAN_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
