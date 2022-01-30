import * as types from "../types";
import axiosConfig from "../config/axiosConfig";

export const getAllProduct =
  (keyword = "", currentPage = 1, price = [0, 1000], category, ratings = 0) =>
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

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
