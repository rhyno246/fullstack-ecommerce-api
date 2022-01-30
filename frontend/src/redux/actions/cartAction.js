import * as types from "../types";
import axiosConfig from "../config/axiosConfig";
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const data = await axiosConfig.get(`/products/${id}`);
  dispatch({
    type: types.ADD_TO_CART,
    payload: {
      id: data.product.id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemToCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: types.REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: types.SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
