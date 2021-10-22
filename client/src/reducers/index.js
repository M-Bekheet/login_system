import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errReducer from "./errReducer";

export default combineReducers({
  user: userReducer,
  err: errReducer,
});
