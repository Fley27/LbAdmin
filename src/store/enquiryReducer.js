import { LOAD_ENQUIRY, GET_ERRORS } from "./actions";
const initialState = {
  enquirylist: [],
  newEnquiry: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ENQUIRY:
      return {
        ...state,
        enquirylist: action.payload,
      };
    case GET_ERRORS:
      return {
        ...state,
        newEnquiry: action.payload,
      };
    default:
      return state;
  }
}
