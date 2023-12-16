import React, { Fragment } from "react";
import Main from "./Layout/Main";
import Products from "./Product/Products";
import MetaData from "./Layout/MetaData";

const Home = () => {
  return (
    <Fragment>
      
      <MetaData title="E-Commerce" />
      <Main />
      <Products />
    </Fragment>
  );
};

export default Home;
