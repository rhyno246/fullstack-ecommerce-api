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

//user admin
export const allUserAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: types.ADMIN_USERS_REQUEST });
    const data = await axiosConfig.get("/admin/users");
    dispatch({ type: types.ADMIN_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.ADMIN_USERS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_DETAILS_REQUEST });
    const data = await axiosConfig.get(`/admin/user/${id}`);

    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update User
export const updateUserAdmin = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST });

    const data = await axiosConfig.put(`/admin/user/${id}`, userData);

    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_USER_REQUEST });
    const data = await axiosConfig.delete(`/admin/user/${id}`);
    dispatch({ type: types.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
