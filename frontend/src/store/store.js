import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducers,
  getProductDetailsReducer,
  submitReviewReducer,
  adminAllProductsReducer,
  createProductReducer,
  updateProductRedicer,
  deleteProductReducer,
} from "../Reducers/productReducer";
import {
  deleteReviewReducer,
  deleteUserReducer,
  forgotPasswordReducer,
  getAllUsersReducer,
  getSingleUserReducer,
  profileReducer,
  updateUserStatusReducer,
  userLoginRegister,
} from "../Reducers/userReducer";
import { addToCartReducer } from "../Reducers/cartReducer";
import {
  deleteOrderReducer,
  getAllOrder,
  myOrderReducer,
  newOrderReducer,
  orderDtailsReducer,
  updateOrderStatus,
} from "../Reducers/orderReducer";
const reducerFun = combineReducers({
  productDetails: getProductDetailsReducer,
  products: productReducers,
  userLoginRegister: userLoginRegister,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: addToCartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  orderDatails: orderDtailsReducer,
  submitReview: submitReviewReducer,
  adminProducts: adminAllProductsReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductRedicer,
  deleteProduct: deleteProductReducer,
  getAllOrders: getAllOrder,
  deleteOrder: deleteOrderReducer,
  updateOrderStatus: updateOrderStatus,
  getAllUsers: getAllUsersReducer,
  getSingleUser: getSingleUserReducer,
  updateUserRole: updateUserStatusReducer,
  deleteUser: deleteUserReducer,
  deleteReview:deleteReviewReducer
});

const middleware = [thunk];
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = legacy_createStore(
  reducerFun,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
