import { SET_CURRENT_USER, USER_LOADING, LOAD_ASSOC_BRANCHES, TOGGLE_BRANCH, GET_FEE_BATCH_DETAILS, GET_BATCH_DETAILS, SELECT_CHILD_BATCH, LOAD_CHILDS, SELECT_CHILD } from "./actions";

const isEmpty = require("is-empty");
const initialState = {
  selectedbatch: "",
  selectedchild: "",
  childrenlist: [],
  batchdetails: [],
  feedetails: []
};
const parentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHILDS:
      return {
        ...state,
        childrenlist: action.payload
      };
    case SELECT_CHILD:
      return {
        ...state,
        selectedchild: action.payload
      };
    case SELECT_CHILD_BATCH:
      return {
        ...state,
        selectedbatch: action.payload
      };
    case GET_BATCH_DETAILS:
      return {
        ...state,
        batchdetails: action.payload
      };
    case GET_FEE_BATCH_DETAILS:
      return {
        ...state,
        feedetails: action.payload
      };
    default:
      return state;
  }
}
export default parentReducer;