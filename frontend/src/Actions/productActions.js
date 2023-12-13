import {
  ADMIN_ALLPRODUCT_FAIL,
  ADMIN_ALLPRODUCT_PROCESS,
  ADMIN_ALLPRODUCT_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_PROCESS,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_PROCESS,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_PROCESS,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_PROCESS,
  DELETE_REVIEW_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_PROCESS,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_PROCESS,
  GET_SINGLE_PRODUCT_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  SUBMIT_REVIEW_PROCESS,
  SUBMIT_REVIEW_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_PROCESS,
  UPDATE_PRODUCT_SUCCESS,
} from "../Constants/productConstants";
import axios from "axios";
export const getAllProducts =
  (keyword = "", page = 1, price = [0, 75000], category, rating = 0) =>
  async (dispatch) => {
    try {
      console.log(keyword);
      dispatch({ type: ALL_PRODUCTS_PROCESS });
      let link = `/api/v1/product?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
      if (category) {
        link = `/api/v1/product?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
      }
      const res = await axios.get(link);
      console.log(res);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: res?.data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_PROCESS });
    const res = await axios.get(`/api/v1/product/${id}`);
    console.log(res);

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: res.data?.product });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const submitReviewAction = (review) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_REVIEW_PROCESS });
    const res = await axios.post("/api/v1/product/review", review);
    console.log(res);

    dispatch({ type: SUBMIT_REVIEW_SUCCESS, payload: res.data?.product });
  } catch (error) {
    dispatch({
      type: SUBMIT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminAllProductsAction = (review) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALLPRODUCT_PROCESS });
    const res = await axios.get("/api/v1/product/admin");

    dispatch({ type: ADMIN_ALLPRODUCT_SUCCESS, payload: res.data?.products });
  } catch (error) {
    dispatch({
      type: ADMIN_ALLPRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProductAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_PROCESS });
    const res = await axios.post("/api/v1/product/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data?.product });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateProductAction = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_PROCESS });
    const res = await axios.put(`/api/v1/product/update/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data?.product });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_PROCESS });
    const res = await axios.delete(`/api/v1/product/delete/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res.data.product });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_PROCESS });
    const res = await axios.get(`/api/v1/product/${id}`);
    console.log(res);

    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: res.data?.product });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletReviewAction = (rid, pid) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_PROCESS });
    const res = await axios.delete(
      `/api/v1/product/review?productId=${pid}&id=${rid}`
    );

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: res.data.product });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
