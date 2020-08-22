import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
} from "../const";

const initialState = {
  upload: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        upload: payload,
        loading: true,
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
