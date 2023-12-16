import { Link } from "react-router-dom";
import React from "react";

const Success = () => {
  return (
    <div className="paymentSuccess">
      <div className="success">
        <h1>Payment Success</h1>
        <i class="fa-solid fa-square-check"></i>
        <Link className="btn btn-secondary" to="/auth/order/me">
          View Order
        </Link>
      </div>
    </div>
  );
};

export default Success;
