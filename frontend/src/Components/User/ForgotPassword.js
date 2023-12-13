import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, sendEmail } from "../../Actions/userActions";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { message, error } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const sendEmailHandler = (e) => {
    e.preventDefault();

    dispatch(sendEmail(email));
    setEmail("");
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: clearErrors() });
    }
  }, [message, error, dispatch]);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Forgot Password</h1>
      <form className="form" onSubmit={sendEmailHandler}>
        <div>
          <TextField
            id="outlined-required"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>Password must be above 8 Character</span>
        </div>
        <Button variant="contained" type="submit">
          Send Email
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
