import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_PROCESS,
  ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_PROCESS,
  CLEAR_ERROR,
  SUBMIT_REVIEW_PROCESS,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  SUBMIT_REVIEW_RESET,
  ADMIN_ALLPRODUCT_PROCESS,
  ADMIN_ALLPRODUCT_SUCCESS,
  ADMIN_ALLPRODUCT_FAIL,
  CREATE_PRODUCT_PROCESS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_PROCESS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_PROCESS,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  GET_SINGLE_PRODUCT_PROCESS,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_RESET,
} from "../Constants/productConstants";
export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_PROCESS:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_DETAILS_RESET:
      return {
        loading: false,
        product: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const submitReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_REVIEW_PROCESS:
      return {
        loading: true,
        ...state,
        success: false,
      };
    case SUBMIT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        review: action.payload,
      };
    case SUBMIT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case SUBMIT_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const adminAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ALLPRODUCT_PROCESS:
      return {
        loading: true,
        ...state,
        success: false,
      };
    case ADMIN_ALLPRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case ADMIN_ALLPRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_PROCESS:
      return {
        loading: true,
        ...state,
        success: false,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CREATE_PRODUCT_RESET:
      return {
        loading: false,
        error: null,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateProductRedicer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_PROCESS:
      return {
        loading: true,
        ...state,
        success: false,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        loading: false,
        error: null,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_PROCESS:
      return {
        loading: true,
        ...state,
        success: false,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_PRODUCT_RESET:
      return {
        loading: false,
        error: null,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getSingleProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_SINGLE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
