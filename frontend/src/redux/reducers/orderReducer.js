import * as types from "../types";
const initialState = {
  orders: {},
  loading: false,
  error: null,
  myorders: [],
  order: {},
  allOrderAdmin: [],
  isDeleted: null,
  isUpdated: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST:
    case types.MY_ORDERS_REQUEST:
    case types.ORDER_DETAILS_REQUEST:
    case types.ALL_ORDERS_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
    case types.DELETE_ORDER_REQUEST:
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
    case types.ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allOrderAdmin: action.payload,
      };
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case types.CREATE_ORDER_FAIL:
    case types.MY_ORDERS_FAIL:
    case types.ORDER_DETAILS_FAIL:
    case types.ALL_ORDERS_FAIL:
    case types.UPDATE_ORDER_FAIL:
    case types.DELETE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case types.DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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
