import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import coach2Reducer from "./coach2Reducer";
import branchReducer from "./branchReducer";
import parentReducer from "./parentReducer";
import reducer from "./reducer";
//fenley
import userReducer from "./userReducer";
import enquiry from "./enquiryReducer";
import article from "./articlesReducer";

const rootReducer = combineReducers({

  reducer: reducer,
  auth: authReducer,
  errors: errorReducer,
  coach2: coach2Reducer,
  branch: branchReducer,
  parent: parentReducer, 
  users: userReducer,
  enquiries: enquiry,
  articles: article,
});

export default rootReducer;