import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOGIN_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  user: null,
  token: localStorage.getItem("user_token"),
  isAuth: false,
  isLoading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      console.log('####USER LOADING')
      console.log(state);
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case UPDATE_SUCCESS:
      localStorage.setItem("user_token", action.payload.token);
      let newState = {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
      };
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      console.log("clearing token", action.type);
      localStorage.removeItem("user_token");
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    case UPDATE_FAIL:
      return state;
    default:
      return state;
  }
}
