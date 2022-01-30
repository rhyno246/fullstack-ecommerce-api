import * as types from "../types";
const initialState = {
  orders: {},
  loading: false,
  error: null,
  myorders: [],
  order: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST:
    case types.MY_ORDERS_REQUEST:
    case types.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case types.MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        myorders: action.payload.orders,
      };
    case types.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };

    case types.CREATE_ORDER_FAIL:
    case types.MY_ORDERS_FAIL:
    case types.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
