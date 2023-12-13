import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const StripeKey = () => {
  const [stripeKey, setStripeKey] = useState("");
  const getStripeKey = async () => {
    const { data } = await axios.get("/payment/secretKey");
    setStripeKey(data.secreatKey);
  };
  useEffect(() => {
    getStripeKey();
  }, []);
  return <Elements stripe={loadStripe(stripeKey)}></Elements>;
};

export default StripeKey;
