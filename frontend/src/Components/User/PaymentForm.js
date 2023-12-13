import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Event } from "@mui/icons-material";
import { VpnKey } from "@mui/icons-material";
import { CreditCard } from "@mui/icons-material";

import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import "./Payment.css";
import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { newOrderAction } from "../../Actions/orderAction";
import { clearErrors } from "../../Actions/orderAction";

const PaymentForm = ({ stripeKey }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.userLoginRegister);
  const stripe = useStripe();
  const elements = useElements();
  const [key, setKey] = useState("");
  const getStripeKey = async () => {
    const { data } = await axios.get("/payment/secretKey");

    setKey(data.secret_key);
  };
  useEffect(() => {
    getStripeKey();
  }, []);
  console.log(key);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.gstCharge,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.totalAmount,
  };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    payBtn.current.disabled = true;
    const paymentData = {
      amount: Math.round(orderInfo.totalAmount * 100),
    };

    console.log(key);
    console.log(stripeKey);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    };
    const { data } = await axios.post("/api/v1/payment/process", paymentData, config);

    console.log(data);
    try {
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.confirmCardPayment(data.secret_Key, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error);
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.

        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(newOrderAction(order));
          navigate("/auth/success");
        } else {
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <div className="paymentContainer">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="paymentForm"
      >
        <div>
          <CreditCard />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <Event />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <VpnKey />
          <CardCvcElement className="paymentInput" />
        </div>

        <input
          type="submit"
          className="paymentFormBtn"
          variant="contained"
          value={`Pay - ₹${orderInfo && orderInfo.totalAmount}`}
          ref={payBtn}
        />
      </form>
    </div>
  );
};

export default PaymentForm;
