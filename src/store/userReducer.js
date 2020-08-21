import { LOAD_STUDENTS, GET_ARTICLE } from "./actions";

const initialState = {
  studentlist: [],
  article: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return {
        ...state,
        studentlist: action.payload,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
