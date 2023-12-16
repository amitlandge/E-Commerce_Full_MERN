import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { addToCartAction, removeToCartAction } from "../../Actions/cartAction";
import { Fragment } from "react";
import NoProducts from "../Layout/NoProducts";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addQuantityHandler = (id, quantity, stock) => {
    console.log(id, quantity, stock);
    if (quantity < stock) {
      let newQuantity = quantity + 1;
      dispatch(addToCartAction(id, newQuantity));
    }
  };
  const removeQuantityHandler = (id, quantity) => {
    if (quantity > 1) {
      let newQuantity = quantity - 1;
      dispatch(addToCartAction(id, newQuantity));
    }
  };
  const productTotalAmount = (quantity, price) => {
    let total = 0;
    total = quantity * price;
    return total;
  };
  const removeToCartHandler = (id) => {
    dispatch(removeToCartAction(id));
  };
  const naviagteToAddress = () => {
    navigate("/auth/shipping");
  };
  return (
    <div>
      <Fragment>
        {cartItems.length !== 0 ? (
          <div className="cart">
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <Card className="cart-flex"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2vmax",
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
                        >
                          <Button
                            onClick={() => {
                              removeToCartHandler(item._id);
                            }}
                            variant="outlined"
                            startIcon={<Delete />}
                            size="small"
                          >
                            Remove
                          </Button>
                        </Typography>
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
                    >
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            addQuantityHandler(
                              item._id,
                              item.quantity,
                              item.stock
                            );
                          }}
                        >
                          +
                        </Button>
                        <input
                          type="number"
                          className="amount"
                          defaultValue={item.quantity}
                          readOnly={true}
                          value={item.quantity}
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            removeQuantityHandler(item._id, item.quantity);
                          }}
                        >
                          -
                        </Button>
                      </Typography>
                    </Box>
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
        ) : (
          <NoProducts />
        )}
      </Fragment>

      {cartItems.length > 0 && (
        <h1 className="total-amount">
          Total Amount :
          {` ₹${cartItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          )}`}
        </h1>
      )}

      <div className="order">
        {cartItems.length > 0 && (
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              naviagteToAddress();
            }}
          >
            Order Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
