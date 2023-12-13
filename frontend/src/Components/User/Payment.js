import React, { useEffect } from "react";
import "./Payment.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";
import axios from "axios";
import { useState } from "react";

const Payment = ({ stripeKey }) => {
  const [key, setKey] = useState();

  const getStripeKey = async () => {
    const { data } = await axios.get("/api/v1/payment/secretKey");

    setKey(data.public_key);
  };

  useEffect(() => {
    getStripeKey();
  }, []);

  return (
    <Elements stripe={loadStripe(key)}>
      <PaymentForm stripeKey={stripeKey} />
    </Elements>
  );
};

export default Payment;
