import React from "react";
import "./Footer.css";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <h1>Download our App</h1>
        <h4>Download App for Android And IOS Mobile Phone</h4>
        <div className="store-image">
          <img src={playStore} alt="playStore" />
          <img src={appStore} alt="appStore" />
        </div>
      </div>
      <div className="middle">
        <h1>E-Commerce</h1>
        <p>High Quality is our First Priority</p>

        <p>Copyright 2023 &#169; Amit</p>
      </div>
      <div className="right">
        <h2>Follow Us</h2>
        <div className="links">
          <a href="#123">Intagram</a>
          <a href="#123">YouTube</a>
          <a href="#123">Facebook</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
