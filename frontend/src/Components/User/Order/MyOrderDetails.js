import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetailsAction } from "../../../Actions/orderAction";
import { productTotalAmount } from "../../../utils/productTotalPrice";
import "./MyOrderDetails.css"
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
const MyOrderDetails = () => {
  const { order } = useSelector((state) => state.orderDatails);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetailsAction(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="orderDtailsContainer">
      <div className="userDetailsContainer">
        <h3>Order #{order._id}</h3>
        <div>
          <h3>Shipping Info</h3>
          <div>
            <span>
              <b>Name</b>: {order.user?.name}
            </span>
          </div>
          <div>
            <span>
              <b>Email</b>: {order.user?.email}
            </span>
          </div>
          <div>
            <b>Address</b>:{" "}
            {order.shippingInfo &&
              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
          </div>
        </div>
      </div>
      <div className="paymentDetails">
        <h3>Payment</h3>
        <div>
          <span>
            <b>Status</b>:{" "}
            {order.paymentInfo?.status === "succeeded" ? (
              <p>Paid</p>
            ) : (
              <p>Pending</p>
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
            <b>Order Status : {order.orderStatus}</b>
          </span>
        </div>
      </div>
      <div className="cartItem-container-order">
        <h3>Order Items</h3>
        <div className="cart">
          {order.orderItems?.map((item) => {
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
  );
};

export default MyOrderDetails;
