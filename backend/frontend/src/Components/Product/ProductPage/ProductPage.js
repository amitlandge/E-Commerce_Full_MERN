import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Actions/productActions";
import ProductItems from "../ProductItems";
import Loader from "../../Layout/Loader";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { clearErrors } from "../../../Actions/productActions";
import { useParams } from "react-router-dom";

import NoProducts from "../../Layout/NoProducts";
const ProductPage = () => {
  const param = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { products, error, loading, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts(param.keyword, page));
  }, [dispatch, error, page, param.keyword]);
  console.log(products);
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
  console.log(Math.ceil(productsCount / resultPerPage));
  return (
    <div>
      <h1 className="product-container-heading">Products</h1>
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
            count={Math.ceil(productsCount / resultPerPage)}
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

export default ProductPage;
