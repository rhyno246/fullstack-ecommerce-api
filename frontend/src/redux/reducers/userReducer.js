import * as types from "../types";
const initialState = {
  users: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  token: null,
  isUpdated: null,
  success: null,
  message: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        token: null,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        users: action.payload.user,
        token: action.payload.token,
      };
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        users: null,
        isAuthenticated: false,
        error: action.payload,
        token: null,
      };
    case types.LOAD_USER_FAIL:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        users: null,
        isAuthenticated: false,
        token: null,
      };

    //profile
    case types.UPDATE_PROFILE_REQUEST:
    case types.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case types.UPDATE_PROFILE_FAIL:
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_PROFILE_RESET:
    case types.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    //forgot & reset pass
    case types.FORGOT_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case types.FORGOT_PASSWORD_FAIL:
    case types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.FORGOT_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        message: "",
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
