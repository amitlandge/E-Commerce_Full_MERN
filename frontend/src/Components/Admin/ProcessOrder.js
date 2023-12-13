import React, { useState } from "react";
import "../User/Order.css";
import { useDispatch, useSelector } from "react-redux";
import { productTotalAmount } from "../../utils/productTotalPrice";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  clearErrors,
  orderDetailsAction,
  updateOrderStatusAction,
} from "../../Actions/orderAction";
import Sidebar from "./Sidebar";

import { toast } from "react-toastify";
import { UPDATE_ORDER_STATUS_RESET } from "../../Constants/orderConstants";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
const ProcessOrder = () => {
  const { user } = useSelector((state) => state.userLoginRegister);

  const [status, setStatus] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDatails);
  const { success, error } = useSelector((state) => state.updateOrderStatus);
  const address = `${order.shippingInfo?.address} , ${order.shippingInfo?.city},${order.shippingInfo?.pincode} , ${order.shippingInfo?.state} , ${order.shippingInfo?.country}`;
  const onOrderStatusHandler = (e) => {
    e.preventDefault();
    if (!status) {
      toast.error("Please Select Status");
    }
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrderStatusAction(params.id, myForm));
  };
  useEffect(() => {
    dispatch(orderDetailsAction(params.id));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch(orderDetailsAction(params.id));
      dispatch({ type: UPDATE_ORDER_STATUS_RESET });
    }
  }, [dispatch, params.id, error, success]);
  return (
    <div>
      <Sidebar />
      <div className="order-container">
        <div className="left-container-order">
          <h2>Shipping Info</h2>
          <div className="shipping-info">
            <div>
              <span>
                <b>Name</b>:{user.name}
              </span>
            </div>
            <div>
              <span>
                <b>Phone</b>:{order.shippingInfo?.phone}
              </span>
            </div>
            <div>
              <span>
                <b>Email</b>:{user.email}
              </span>
            </div>
            <div>
              <span>
                <b>Address</b>:{address}
              </span>
            </div>
          </div>
          <hr></hr>
          <div className="paymentDetails">
            <h3>Payment</h3>
            <div>
              <span>
                <b>Status</b>:<br></br>
                {order.paymentInfo?.status === "succeeded" ? (
                  // <p style={{ color: "green" }}>Paid</p>

                  <Button
                    variant="contained"
                    style={{ background: "green", margin: "1vmax 0vmax" }}
                    aria-readonly
                  >
                    Paid
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ background: "red", margin: "1vmax 0vmax" }}
                    aria-readonly
                  >
                    Processing
                  </Button>
                )}
              </span>
            </div>

            <div>
              <span>
                <b>Amount </b> : {order.totalPrice} Rs
              </span>
            </div>
            <div className="orderStatus">
              <span>
                <b>Order Status : </b>
                {order.orderStatus === "Processing" ? (
                  <b style={{ color: "red" }}>Processing</b>
                ) : (
                  ""
                )}
                {order.orderStatus === "Shipped" ? (
                  <b style={{ color: "green" }}>Shipped</b>
                ) : (
                  ""
                )}
                {order.orderStatus === "Delivered" ? (
                  <b style={{ color: "green" }}>Delivered</b>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
          <hr></hr>
          <div className="cartItem-container-order">
            <h2>Your Cart Items</h2>
            <div className="cart orderedCart">
              {order.orderItems &&
                order.orderItems.map((item) => {
                  return (
                    <>
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2vmax",
                          padding: "1vmax",
                          flexWrap: "wrap",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={item.image}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h5">
                              {item.name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            >
                              Price: {item.price} Rs
                            </Typography>

                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            ></Typography>
                          </CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          ></Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        ></Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Total Amount:{" "}
                          {productTotalAmount(item.quantity, item.price)} Rs
                        </Typography>
                      </Card>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="right-container-order">
          <form className="form shippedForm" onSubmit={onOrderStatusHandler}>
            <h3>Select Order Status</h3>
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              style={{ width: "50%", paddingLeft: "2vmax" }}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>

            <Button variant="contained" type="submit">
              Process
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;
