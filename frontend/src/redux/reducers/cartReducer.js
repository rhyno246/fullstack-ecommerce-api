import * as types from "../types";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === isItemExist.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case types.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };

    case types.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
