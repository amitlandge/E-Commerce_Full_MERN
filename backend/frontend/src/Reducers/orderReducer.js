import {
  ORDER_PRODUCTS_FAIL,
  ORDER_PRODUCTS_PROCESS,
  ORDER_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
  MY_ORDER_PROCESS,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_PROCESS,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  GET_ALL_ORDERS_PROCESS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  DELETE_ORDER_PROCESS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_STATUS_PROCESS,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_RESET,
} from "../Constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PRODUCTS_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case ORDER_PRODUCTS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_PRODUCTS_FAIL:
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

export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDER_FAIL:
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

export const orderDtailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
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

export const getAllOrder = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };
    case GET_ALL_ORDERS_FAIL:
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

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_PROCESS:
      return {
        loading: true,
        success: false,
        ...state,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case GET_ALL_ORDERS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case DELETE_ORDER_RESET:
      return {
        loading: false,
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

export const updateOrderStatus = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_PROCESS:
      return {
        loading: true,
        success: false,
        ...state,
      };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_ORDER_STATUS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case UPDATE_ORDER_STATUS_RESET:
      return {
        loading: false,
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
