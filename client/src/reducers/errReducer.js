import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: null,
  status: null,
  id: null,
};

export default function errReducer(state = initialState, action) {
  console.log('ERR REDUCER');
  console.log(action.type);
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return initialState;
    default:
      console.log('ERROR REDUCER DEFAULT', action);
      return initialState;
  }
}
