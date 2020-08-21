import { GET_COACH_VIEW2 ,FETCH_LEAVES} from "./actions";
const initialState = {
    coachlist:[],
    leavelist:[]
  };


  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_COACH_VIEW2:
        return {
          ...state,
          coachlist : action.payload
        };
        case FETCH_LEAVES:
        return {
          ...state,
          leavelist : action.payload
        };
      default:
        return state;
    }
  }