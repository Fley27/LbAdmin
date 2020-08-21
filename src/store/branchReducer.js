import {
  LOAD_BRANCHES,
  USER_LOADING,
  GET_SUCCESS,
  LOAD_BATCHES,
  VIEW_TT,
  SET_CURRENT_USER,
  GET_ERRORS,
  SELECT_COACH_BATCH,
  VIEW_BATCH_STUDENTS,
} from "./actions";

const isEmpty = require("is-empty");
const initialState = {
  branchlist: [],
  success: "Data saved !",
  batchlist: [],
  timetable: null,
  currentUser: null,
  coachbatch: null,
  coachsession: null,
  studentList: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case VIEW_BATCH_STUDENTS:
      return {
        ...state,
        studentList: action.payload,
      };
    case SELECT_COACH_BATCH:
      return {
        ...state,
        coachbatch: action.payload.selectedId,
        coachsession: action.payload.selectedSession,
      };
    case LOAD_BRANCHES:
      return {
        ...state,
        branchlist: action.payload,
      };
    case LOAD_BATCHES:
      return {
        ...state,
        batchlist: action.payload,
      };
    case GET_SUCCESS:
      return {
        ...state,
        success: "ARE WE SUCCESSFUL ?",
      };
    case VIEW_TT:
      return {
        ...state,
        timetable: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
