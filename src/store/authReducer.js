import { SET_CURRENT_USER, USER_LOADING, LOAD_ASSOC_BRANCHES,TOGGLE_BRANCH } from "./actions";

const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  selectedbranch: "",
  selectedbatch: "",
  assocbranch: [],
  access : ""
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOAD_ASSOC_BRANCHES:
      return {
        ...state,
        assocbranch: action.payload
      };
    case TOGGLE_BRANCH:
      return {
        ...state,
        selectedbranch: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
export default authReducer;