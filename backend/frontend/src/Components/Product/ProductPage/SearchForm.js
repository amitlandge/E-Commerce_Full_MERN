import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchProductHandler = (e) => {
    console.log("enter");
    e.preventDefault();
    if (keyword.trim().length > 0) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <form className="search-form" onSubmit={searchProductHandler}>
      <TextField
        className="search-input"
        id="outlined-required"
        label="Search"
        variant="outlined"
        value={keyword}
        type="text"
        sx={{ background: "white", width: "30vmax" }}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <Button variant="contained" type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
