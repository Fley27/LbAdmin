import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
} from "../const";
import jwt_decode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: payload,
      };
    case LOG_IN_SUCCESS:
      localStorage.setItem("token", payload.token);
      const decoded = jwt_decode(payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        user: decoded,
        loading: true,
      };
      case REGISTER_SUCCESS:
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            user: payload,
            loading: true,
          };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
    case LOG_IN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
}
