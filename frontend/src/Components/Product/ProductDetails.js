import React, { useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearErrors,
  deletReviewAction,
  getProductDetails,
  submitReviewAction,
} from "../../Actions/productActions";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-material-ui-carousel";
import { addToCartAction } from "../../Actions/cartAction";
import { toast } from "react-toastify";
import { IconButton, Rating } from "@mui/material";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import {
  DELETE_REVIEW_RESET,
  SUBMIT_REVIEW_RESET,
} from "../../Constants/productConstants";
import { Delete, Reviews, ShoppingCart } from "@mui/icons-material";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, user } = useSelector(
    (state) => state.userLoginRegister
  );
  const { success, error } = useSelector((state) => state.submitReview);

  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.deleteReview
  );
  const [ratings, setRatings] = useState(0);
  const [review, setReview] = useState("");
  console.log(product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);
  console.log(product.image);
  const addQuantityHandler = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const removeQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCartHandler = () => {
    dispatch(addToCartAction(product._id, +quantity));
    toast.success("Added Item Successfully");
  };
  console.log(cartItems);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      submitReviewAction({
        productId: product._id,
        comment: review,
        rating: ratings,
      })
    );
    setReview("");
    setRatings(0);
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: SUBMIT_REVIEW_RESET });
    }
    if (deleteSuccess) {
      dispatch(getProductDetails(params.id));
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    if (deleteError) {
      toast.error(deleteError);
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, error, success, params.id, deleteSuccess, deleteError]);

  const deleteReviewHandler = (rid, pid) => {
    console.log(rid, pid);
    dispatch(deletReviewAction(rid, pid));
  };
  return (
    <>
      <div className="productDetails-container">
        <div className="left-container">
          <div className="image-container">
            {/* <img alt="p1" src={product.image[0].url} className="product-image" /> */}
            <Carousel>
              {product.image &&
                product.image.map((item, i) => (
                  <div>
                    <img
                      className="carouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
        <div className="right-container">
          <div>
            <h1>{product.name}</h1>
            <p>Product # {product._id}</p>
            <hr color="black"></hr>
            <span className="reviewsec">
              <Rating
                name="read-only"
                value={product.rating}
                readOnly
                precision={0.5}
              />
              ({product.reviews?.length} Reviews)
            </span>
            <hr color="black"></hr>
            <br></br>
            <h3>{product.price} Rs</h3>
          </div>
          <div className="buttons">
            <div className="amount-buttons">
              <button onClick={removeQuantityHandler}>-</button>
              <input
                type="number"
                className="amount"
                defaultValue={1}
                readOnly
                value={quantity}
              />
              <button onClick={addQuantityHandler}>+</button>
            </div>
            {product.stock && isAuthenticated > 0 ? (
              // <button
              //   className="cartBtn"
              //   type="button"
              //   onClick={addToCartHandler}
              // >
              //   Add To Cart
              // </button>
              <Button
                variant="contained"
                onClick={addToCartHandler}
                style={{ margin: "1vmax 0vmax" }}
              >
                Add To Cart
                <ShoppingCart
                  style={{ marginLeft: "1vmax", fontSize: "1.3vmax" }}
                />
              </Button>
            ) : (
              ""
            )}
          </div>
          <hr color="black"></hr>
          <div>
            <h4 className="stock-status">
              Status :{" "}
              {product.stock < 1 ? (
                <span style={{ color: "red" }}>Out of Stock</span>
              ) : (
                <span style={{ color: "#1976D2" }}>In Stock</span>
              )}
            </h4>
            <hr color="black"></hr>
            <div className="description">
              <h3>Specification :-</h3>
              <p>{product.description}</p>
            </div>
          </div>
          <hr color="black"></hr>
          <div className="review-box">
            <Button
              variant="contained"
              onClick={handleClickOpen}
              style={{ margin: "1vmax 0vmax" }}
            >
              Submit Review
              <Reviews style={{ marginLeft: "1vmax", fontSize: "1.3vmax" }} />
            </Button>
          </div>
        </div>
      </div>
      <hr color="black"></hr>
      <div className="review-container">
        <h1>Reviews</h1>
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((rev) => {
              return (
                <div className="user-review">
                  <img
                    src="data:image/png;base64,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"
                    alt="user"
                  />
                  <div className="user-review-content">
                    <h1>{rev.name}</h1>
                    <p>{rev.comment}</p>
                    <Rating
                      name="read-only"
                      value={rev.rating}
                      readOnly
                      precision={0.5}
                    />
                    <div>
                      {rev.user === user?._id ? (
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteReviewHandler(rev._id, product._id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Review</DialogTitle>
          <DialogContent>
            <Rating
              name="simple-controlled"
              value={ratings}
              onChange={(event, newValue) => {
                setRatings(newValue);
              }}
            />
            <textarea
              rows={7}
              cols={50}
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitReviewHandler}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default ProductDetails;
