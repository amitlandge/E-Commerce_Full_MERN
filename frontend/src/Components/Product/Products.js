import React, { useState } from "react";
import ProductItems from "./ProductItems";
import "./Products.css";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllProducts } from "../../Actions/productActions";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import NoProducts from "../Layout/NoProducts";

const CategoryArray = ["Laptop", "Mobile", "Ipad", "Computer", "Watch"];
const Products = () => {
  const [category, setCategory] = useState("");
  const [rating, setRatings] = useState(0);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 75000]);
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    // productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts("", page, price, category, rating));
    // eslint-disable-next-line
  }, [dispatch, page, price, category, rating, error]);
  if (error) {
    toast.error(error);
  }
  const productContent =
    products &&
    products.map((item) => (
      <ProductItems
        name={item.name}
        key={item.id}
        id={item._id}
        price={item.price}
        description={item.description}
        reviews={item.reviews}
        rating={item.rating}
        image={item.image}
        numberOfReviews={item.numberOfReviews}
      />
    ));
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };
  const filterPriceHandler = (e, value) => {
    setPrice(value);
    console.log(value);
  };
  const ratingHandler = (e, value) => {
    console.log(value);
    setRatings(value);
  };

  // console.log(Math.ceil(products.length / resultPerPage) );
  return (
    <div className="product-container-box">
      <h1 className="product-container-heading">Products Features</h1>
      <div className="product-container">
        {loading ? (
          <Loader />
        ) : (
          <div className="product-main-container">
            {products && products.length !== 0 ? (
              productContent
            ) : (
              <div className="product-main-container">
                <NoProducts />
              </div>
            )}
          </div>
        )}
        <div className="filter-container">
          <Box width={"16vmax"}>
            <p>Price</p>
            <Slider
              getAriaLabel={() => "range-slider"}
              onChange={filterPriceHandler}
              valueLabelDisplay="on"
              value={price}
              min={0}
              max={75000}
            />
            <List>
              <ul>
                {CategoryArray.map((category) => {
                  return (
                    <li
                      style={{ cursor: "pointer" }}
                      className="category-link"
                      onClick={() => {
                        setCategory(category);
                      }}
                    >
                      {category}
                    </li>
                  );
                })}
              </ul>
            </List>
          </Box>
          <hr color="black"></hr>
          <div>
            <p>Ratings</p>
            <Slider
              aria-label="Small steps"
              onChange={ratingHandler}
              defaultValue={0}
              step={1}
              marks
              min={0}
              max={5}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      </div>
      <div>
        <Box
          sx={{
            margin: "2% auto",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Pagination
            count={Math.ceil(filteredProductsCount / resultPerPage) + 1}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
      </div>
    </div>
  );
};

export default Products;
