import * as types from "../types";
import axiosConfig from "../config/axiosConfig";
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const data = await axiosConfig.post("/order/new", order);
    if (data.success) {
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: types.CREATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: types.MY_ORDERS_REQUEST });
    const data = await axiosConfig.get("/orders/me");
    if (data.success) {
      dispatch({ type: types.MY_ORDERS_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: types.MY_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.ORDER_DETAILS_REQUEST });
    const data = await axiosConfig.get(`/order/${id}`);
    if (data.success) {
      dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: types.ORDER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
