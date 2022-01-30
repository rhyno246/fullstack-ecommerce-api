import * as types from "../types";
import axiosConfig from "../config/axiosConfig";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: types.LOAD_USER_REQUEST,
    });
    const data = await axiosConfig.get("/me");
    dispatch({
      type: types.LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.LOAD_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: types.LOGIN_REQUEST,
    });
    const data = await axiosConfig.post("/login", {
      email,
      password,
    });
    if (data.success) {
      localStorage.setItem("token", data.token);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: types.REGISTER_REQUEST,
    });
    const data = await axiosConfig.post("/register", userData);
    if (data.success) {
      localStorage.setItem("token", data.token);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.REGISTER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: types.UPDATE_PROFILE_REQUEST,
    });
    const data = await axiosConfig.put("/me/update", userData);
    if (data.success) {
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({
      type: types.UPDATE_PASSWORD_REQUEST,
    });
    const data = await axiosConfig.put("/password/update", password);
    if (data.success) {
      dispatch({
        type: types.UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: types.FORGOT_PASSWORD_REQUEST,
    });
    const data = await axiosConfig.post("/password/forgot", {
      email,
    });
    if (data.success) {
      dispatch({
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const resetPassword =
  (token, confirmPassword, password) => async (dispatch) => {
    try {
      dispatch({
        type: types.RESET_PASSWORD_REQUEST,
      });
      const data = await axiosConfig.put(`/password/reset/${token}`, {
        confirmPassword,
        password,
      });
      if (data.success) {
        dispatch({
          type: types.RESET_PASSWORD_SUCCESS,
          payload: data.success,
        });
      }
    } catch (error) {
      dispatch({
        type: types.RESET_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: types.LOGOUT_SUCCESS,
  });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
