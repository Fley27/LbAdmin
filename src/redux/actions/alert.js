
import { SET_ALERT } from '../const';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, timeout }
	});
};