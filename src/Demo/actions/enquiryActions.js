import axios from "axios";

import { GET_ERRORS, LOAD_ENQUIRY } from "../../store/actions";

// Register User
export const getEnquiry = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/enquiry")
    .then((res) =>
      dispatch({
        type: LOAD_ENQUIRY,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const enquiryProc = (enquiryData) => (dispatch) => {
  axios.post("http://localhost:5000/api/enquiry", enquiryData).then((res) =>
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    })
  );
};
