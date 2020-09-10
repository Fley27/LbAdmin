import { SET_ALERT, REMOVE_ALERT } from "../const";
const initialState = {
  msg: "",
  alertType: "",
  timeout: 0
};
export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        msg: payload.msg,
        alertType: payload.alertType,
        timeout: payload.timeout
      };
    default:
      return state;
  }
}
