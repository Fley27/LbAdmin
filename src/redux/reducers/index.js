import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import reducer from "./reducer";
export default combineReducers({
  alert,
  auth,
  reducer,
  user,
});
