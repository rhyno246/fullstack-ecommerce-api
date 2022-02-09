import * as types from "../types";
import axiosConfig from "../config/axiosConfig";

export const getAllSlider = () => async (dispatch) => {
  try {
    dispatch({
      type: types.ALL_SLIDER_REQUEST,
    });
    const data = await axiosConfig.get("/admin/slider");
    dispatch({
      type: types.ALL_SLIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.ALL_SLIDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const createAdminSlider = (dataSlider) => async (dispatch) => {
  try {
    dispatch({
      type: types.CREATE_SLIDER_REQUEST,
    });
    const data = await axiosConfig.post("/admin/slider/new", dataSlider);
    dispatch({
      type: types.CREATE_SLIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_SLIDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getAdminSliderDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.SLIDER_DETAILS_REQUEST,
    });
    const data = await axiosConfig.get(`/admin/slider/${id}`);
    dispatch({
      type: types.SLIDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.SLIDER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const updateAdminSlider = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_SLIDER_REQUEST });
    const data = await axiosConfig.put(`/admin/slider/${id}`, updateData);
    dispatch({
      type: types.UPDATE_SLIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_SLIDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
