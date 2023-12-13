import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  updateProductAction,
} from "../../Actions/productActions";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../Layout/Loader";
import { UPDATE_PRODUCT_RESET } from "../../Constants/productConstants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { product } = useSelector((state) => state.productDetails);
  const { success, loading } = useSelector((state) => state.updateProduct);
  const categories = ["Laptop", "Electronic", "Accessaries"];
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategary] = useState();
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (product && product._id !== params.id) {
      dispatch(getProductDetails(params.id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCategary(product.category);
      setPrice(product.price);
      setStock(product.stock);
    }

    if (success) {
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, params.id, success, product, navigate]);

  const updateProductHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("stock", stock);
    formData.set("category", category);
    images.map((img) => formData.append("image", img));
    if (name && description && price && stock && category) {
      dispatch(updateProductAction(formData, params.id));
    } else {
      toast.error("Please Insert All the Fields");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Sidebar />
          <div className="createform">
            <form className="form" onSubmit={updateProductHandler}>
              <div>
                <TextField
                  id="outlined-uncontrolled"
                  placeholder="Product Name"
                  variant="filled"
                  value={name}
                  type="text"
                  sx={{ background: "white", width: "30vmax" }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  id="outlined-required"
                  placeholder="Price"
                  variant="filled"
                  value={price}
                  type="number"
                  sx={{ background: "white", width: "30vmax" }}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <textarea
                  style={{
                    padding: "1vmax",
                    width: "30vmax",
                    height: "10vmax",
                  }}
                  placeholder="Product Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <div>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  defaultValue={category}
                  label="Select Category"
                  onChange={(e) => {
                    setCategary(e.target.value);
                  }}
                  style={{ width: "30vmax", paddingLeft: "2vmax" }}
                >
                  {categories.map((item, index) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <TextField
                  id="outlined-required"
                  placeholder="Stock"
                  variant="filled"
                  value={stock}
                  type="number"
                  sx={{
                    background: "white",
                    width: "30vmax",
                  }}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </div>
              <div>
               

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  <input
                    type="file"
                    placeholder="something"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setImages(Array.from(e.target.files));
                    }}
                  />
                  Upload Files
                </Button>
              </div>
              <div className="preview">
                {images &&
                  images.map((item) => (
                    <img src={URL.createObjectURL(item)} alt="images" />
                  ))}
              </div>
              <Button variant="contained" type="submit">
                Create Product
              </Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProduct;
