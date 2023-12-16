import React from "react";
import "./Main.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Main = () => {
  return (
    <div className="main-page">
      <div className="headerContainer">
        <h1 className="heading-main">E-Commerce For Everyone</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea cumque
          vero cum, culpa facere voluptas sequi molestiae iusto doloremque
          similique!
        </p>
        <Button variant="contained">
          <Link to="/auth/signup" style={{color:"white"}}>
            Sign Up Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Main;
