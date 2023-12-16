import axios from "axios";
import {
  ADD_SHIPPING_INFO,
  ADD_TO_CART_SUCCESS,
  REMOVE_TO_CART_SUCCESS,
} from "../Constants/productConstants";

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: {
      _id: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  console.log(getState());
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeToCartAction =
  (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: REMOVE_TO_CART_SUCCESS,
      payload: data.product._id,
    });
    console.log(getState());
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
  export const shippingInfoAction = (data) => async (dispatch) => {
    dispatch({
      type: ADD_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };