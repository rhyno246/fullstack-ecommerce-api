import * as types from "../types";
import axiosConfig from "../config/axiosConfig";

export const getAllContact = () => async (dispatch) => {
  try {
    dispatch({
      type: types.ALL_CONTACT_REQUEST,
    });
    const data = await axiosConfig.get("/admin/contact");
    dispatch({
      type: types.ALL_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.ALL_CONTACT_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const createAdminContact = (dataSlider) => async (dispatch) => {
  try {
    dispatch({
      type: types.CREATE_CONTACT_REQUEST,
    });
    const data = await axiosConfig.post("/admin/contact/create", dataSlider);
    dispatch({
      type: types.CREATE_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_CONTACT_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const deleteAdminContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CONTACT_REQUEST });
    const data = await axiosConfig.delete(`/admin/contact/${id}`);
    dispatch({
      type: types.DELETE_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CONTACT_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
