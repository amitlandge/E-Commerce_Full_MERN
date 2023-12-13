import React from "react";
import "./Order.css";
import { useSelector } from "react-redux";
import { productTotalAmount } from "../../utils/productTotalPrice";
import ProgressBar from "../Layout/ProgressBar";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Order = () => {
  const { user } = useSelector((state) => state.userLoginRegister);
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const address = `${shippingInfo.address} , ${shippingInfo.city},${shippingInfo.pincode} , ${shippingInfo.state} , ${shippingInfo.country}`;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subtotal > 1000 ? 0 : 50;
  const gstCharge = (subtotal * 18) / 100;
  const totalAmount = subtotal + shippingCharge + gstCharge;
  const processPaymentHandler = () => {
    let paymentData = {
      subTotal: subtotal,
      shippingCharge: shippingCharge,
      gstCharge: gstCharge,
      totalAmount: totalAmount,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(paymentData));
    navigate("/auth/payment/process");
  };
  return (
    <div>
      <ProgressBar value={50} />
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
                <b>Phone</b>:{shippingInfo.phone}
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
          <hr style={{ color: "black" }} />
          <div className="cartItem-container-order">
            <h2>Your Cart Items</h2>
            <div className="cart orderedCart">
              {cartItems.map((item) => {
                return (
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
                );
              })}
            </div>
          </div>
        </div>
        <div className="right-container-order">
          <h2>Order Summary</h2>
          <div className="order-amount">
            <div>
              <b>Subtotal </b>
              <p>₹ {subtotal}</p>
            </div>
            <div>
              <b>Shpping Charge</b>
              <p>₹ {shippingCharge}</p>
            </div>
            <div>
              <b>GST</b>
              <p>₹ {gstCharge}</p>
            </div>
            <div>
              <b>Total Amount</b>
              <p>₹{totalAmount}</p>
            </div>
          </div>

          <Button
            variant="contained"
            type="submit"
            onClick={processPaymentHandler}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
