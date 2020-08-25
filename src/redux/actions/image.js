import axios from "axios";
import { setAlert } from "./alert";
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
} from "../const";

export const uploadImage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  dispatch({
    type: UPLOAD_IMAGE_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/image/upload`,
      formData,
      config
    );
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
    });
  }
};
