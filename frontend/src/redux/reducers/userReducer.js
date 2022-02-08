import * as types from "../types";
const initialState = {
  users: localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : null,
  loading: false,
  isAuthenticated: false,
  error: null,
  token: null,
  isUpdated: null,
  isDeleted: null,
  success: null,
  message: "",
  allUsersAdmin: [],
  userAdminDetail: {},
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
    case types.UPDATE_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
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

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };
    case types.UPDATE_PROFILE_FAIL:
    case types.UPDATE_PASSWORD_FAIL:
    case types.UPDATE_USER_FAIL:
    case types.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_PROFILE_RESET:
    case types.UPDATE_PASSWORD_RESET:
    case types.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case types.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
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

    //user admin
    case types.ADMIN_USERS_REQUEST:
    case types.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsersAdmin: action.payload.users,
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAdminDetail: action.payload.user,
      };
    case types.ADMIN_USERS_FAIL:
    case types.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //clear
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
