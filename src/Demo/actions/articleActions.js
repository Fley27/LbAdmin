import axios from "axios";

import { GET_ARTICLE,GET_GALLERY } from "../../store/actions";

export const getArticle = (formData) => (dispatch) => {
  axios
    .get(`https://mighty-ridge-28744.herokuapp.com/api/blog/getPost/${formData._id}`)
    .then((res) =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getGallery = (formData) => (dispatch) => {
  axios
    .get(`https://mighty-ridge-28744.herokuapp.com/api/users/viewallimages`)
    .then((res) =>
      dispatch({
        type: GET_GALLERY,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
