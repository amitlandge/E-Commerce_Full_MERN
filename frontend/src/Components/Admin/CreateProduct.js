import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProductAction } from "../../Actions/productActions";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from "../../Constants/productConstants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Loader from "../Layout/Loader";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector(
    (state) => state.createProduct
  );
  const categories = ["Laptop", "Electronic", "Accessaries"];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategary] = useState("");
  const [images, setImages] = useState([]);

  const createProductHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("stock", stock);
    formData.set("category", category);
    images && images.map((img) => formData.append("image", img));
    if (name && description && price && stock && category && images) {
      dispatch(createProductAction(formData));
    } else {
      toast.error("Please Insert All the Fields");
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: CREATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Sidebar />
          <div className="createform">
            <form className="form" onSubmit={createProductHandler}>
              <div>
                <TextField
                  id="outlined-required"
                  label="Product Name"
                  variant="outlined"
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
                  label="Price"
                  variant="outlined"
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
                  label="Stock"
                  variant="outlined"
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
                {/* <input
                  type="file"
                  placeholder="Choose Files"
                  multiple={true}
                  onChange={(e) => {
                    setImages(Array.from(e.target.files));
                  }}
                /> */}

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

export default CreateProduct;
