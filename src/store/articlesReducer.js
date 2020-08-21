import { GET_ARTICLE, GET_GALLERY } from "./actions";
const initialState = {
  articlelist: [],
  gallery: null,
  article: null,
  file: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case GET_GALLERY:
      return {
        ...state,
        gallery: action.payload,
      };
    default:
      return state;
  }
}
