import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { LOAD_STUDENTS, GET_ARTICLE } from "../../store/actions";

// Register User
export const getUser = () => (dispatch) => {
  axios
    .post("http://localhost:5000/api/branch/viewusers")
    .then((res) =>
      dispatch({
        type: LOAD_STUDENTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getArticle = (formData) => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/blog/getPost/${formData._id}`)
    .then((res) =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
