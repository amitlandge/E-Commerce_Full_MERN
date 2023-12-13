import axios from "axios";
import {
  CLEAR_ERROR,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_PROCESS,
  DELETE_ORDER_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_PROCESS,
  GET_ALL_ORDERS_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_PROCESS,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_PROCESS,
  ORDER_DETAILS_SUCCESS,
  ORDER_PRODUCTS_FAIL,
  ORDER_PRODUCTS_PROCESS,
  ORDER_PRODUCTS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_PROCESS,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../Constants/orderConstants";

export const newOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PRODUCTS_PROCESS });
    const { data } = await axios.post("/api/v1/order/create", order);
    dispatch({ type: ORDER_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_PROCESS });
    const res = await axios.get("/api/v1/order/myOrder");

    dispatch({ type: MY_ORDER_SUCCESS, payload: res.data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const orderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_PROCESS });
    const res = await axios.get(`/api/v1/order/user/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: res.data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_PROCESS });
    const res = await axios.get("/api/v1/order/allOrders");

    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ORDER_PROCESS });
    const res = await axios.delete(`/api/v1/order/delete/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrderStatusAction =
  (id, status) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_PROCESS });
      const res = await axios.put(`/api/v1/order/update/${id}`, status);

      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_STATUS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
