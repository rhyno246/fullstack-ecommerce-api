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

//all order admin
export const allAdminOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.ALL_ORDERS_REQUEST });
    const data = await axiosConfig.get("/admin/orders");
    if (data.success) {
      dispatch({ type: types.ALL_ORDERS_SUCCESS, payload: data.orders });
    }
  } catch (error) {
    dispatch({
      type: types.ALL_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  }
};
//updated order
export const updatedOrderAdmin = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const data = await axiosConfig.put(`/admin/orders/${id}`, order);
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//deleted order
export const deleteOrderAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.DELETE_ORDER_REQUEST,
    });
    const data = await axiosConfig.delete(`/admin/orders/${id}`);
    dispatch({
      type: types.DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// striple key

export const getStripleKey = () => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_STRIPLE_REQUEST,
    });
    const data = await axiosConfig.get(`/stripeapikey`);
    dispatch({
      type: types.GET_STRIPLE_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("striple", JSON.stringify(data.stripeApiKey));
  } catch (error) {
    dispatch({
      type: types.GET_STRIPLE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
