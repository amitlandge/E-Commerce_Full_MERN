import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductItems from "../ProductItems";
import { getAllProducts } from "../../../Actions/productActions";
import Loader from "../../Layout/Loader";
const SearchProduct = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts(param.keyword));
  }, [dispatch, param.keyword]);
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
  return (
    <div>
      <h1 className="product-container-heading">Products</h1>
      {products.length > 0 ? (
        <div className="product-main-container">
          {loading ? <Loader /> : productContent}
        </div>
      ) : (
        <p style={{textAlign:"center"}}>No Product Found</p>
      )}
    </div>
  );
};

export default SearchProduct;
