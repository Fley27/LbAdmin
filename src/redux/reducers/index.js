import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import reducer from "./reducer";
import challenge from "./challenge";
import challengeType from "./challengeType";
import image from "./image";
import challengeCategory from "./challengeCategory";
import store from "./store";
import plan from "./plan"

export default combineReducers({
  alert,
  auth,
  reducer,
  user,
  challengeType,
  challengeCategory,
  image,
  challenge,
  store,
  plan
});
