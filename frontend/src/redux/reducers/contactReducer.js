import * as types from "../types";
const initialState = {
  contacts: [],
  loading: false,
  isDeleted: null,
  error: null,
  success: null,
};
export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CONTACT_REQUEST:
    case types.DELETE_CONTACT_REQUEST:
    case types.ALL_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload.contacts,
      };
    case types.CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case types.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };
    case types.CREATE_CONTACT_FAIL:
    case types.DELETE_CONTACT_FAIL:
    case types.ALL_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CREATE_CONTACT_RESET:
      return {
        ...state,
        success: false,
      };
    case types.DELETE_CONTACT_RESET:
      return {
        ...state,
        isDeleted: false,
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
