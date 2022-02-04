import * as types from "../types";
import axiosConfig from "../config/axiosConfig";

export const getAllProduct =
  (keyword = "", currentPage = 1, price = [0, 10000], category, ratings = 0) =>
  async (dispatch) => {
    let link = `/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      link = `/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    try {
      dispatch({
        type: types.GET_ALL_PRODUCTS_REQUEST,
      });
      const data = await axiosConfig.get(link);
      dispatch({
        type: types.GET_ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_PRODUCTS_FAIL,
        payload: error.response.data.error,
      });
    }
  };
export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCTS_DETAILS_REQUEST,
    });
    const data = await axiosConfig.get(`/products/${id}`);
    dispatch({
      type: types.PRODUCTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.PRODUCTS_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const createNewReview = (review) => async (dispatch) => {
  try {
    dispatch({
      type: types.NEW_REVIEW_REQUEST,
    });
    const data = await axiosConfig.put(`/review`, review);
    dispatch({
      type: types.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: types.NEW_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
};

//admin get all prodduct
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.ADMIN_PRODUCT_REQUEST });
    const data = await axiosConfig.get("/admin/products");
    dispatch({
      type: types.ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.ADMIN_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

//admin create new product
export const createNewProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({
      type: types.NEW_PRODUCT_REQUEST,
    });
    const data = await axiosConfig.post(`/admin/products/new`, newProduct);
    dispatch({
      type: types.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.NEW_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

//delete product admin
export const deleteProductAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.DELETE_PRODUCT_REQUEST,
    });
    const data = await axiosConfig.delete(`/admin/products/${id}`);
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
