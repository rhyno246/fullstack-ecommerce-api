import * as types from "../types";
const initialState = {
  sliders: [],
  slider: {},
  loading: false,
  isUpdated: null,
  isDeleted: null,
  error: null,
  success: null,
};
export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_SLIDER_REQUEST:
    case types.CREATE_SLIDER_REQUEST:
    case types.SLIDER_DETAILS_REQUEST:
    case types.UPDATE_SLIDER_REQUEST:
    case types.DELETE_SLIDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        sliders: action.payload.slider,
      };

    case types.CREATE_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case types.SLIDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        slider: action.payload.slider,
      };
    case types.UPDATE_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case types.DELETE_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case types.ALL_SLIDER_FAIL:
    case types.CREATE_SLIDER_FAIL:
    case types.SLIDER_DETAILS_FAIL:
    case types.UPDATE_SLIDER_FAIL:
    case types.DELETE_SLIDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CREATE_SLIDER_RESET:
      return {
        ...state,
        success: false,
      };
    case types.UPDATE_SLIDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case types.DELETE_SLIDER_RESET:
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
