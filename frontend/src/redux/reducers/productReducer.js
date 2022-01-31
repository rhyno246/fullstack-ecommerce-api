import * as types from "../types";
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  productCount: 0,
  resultPerPage: 0,
  success: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case types.GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.PRODUCTS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
      };
    case types.PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    case types.PRODUCTS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //review
    case types.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case types.NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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
