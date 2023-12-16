import React, { Fragment, useEffect, useState } from "react";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../Actions/userActions";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";


import { Button } from "@mui/material";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector(
    (state) => state.userLoginRegister
  );
  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });
  const [submit, setSubmit] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = email.trim().includes("@");

  const isPasswordValid = password.trim().length >= 8;
  const submitUserData = (event) => {
    event.preventDefault();
    setSubmit(true);
    setValidation({
      email: isEmailValid,
      password: isPasswordValid,
    });
    if (isEmailValid && isPasswordValid) {
      dispatch(loginUser(email, password));
    }

    console.log(validation);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/auth/account");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <Fragment>
      <form onSubmit={submitUserData} className="form">
        <h1> User Login</h1>

        <div
          className={
            validation.email && submit ? "email-field" : "email-field invalid"
          }
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>Please Enter Your Email</span>
        </div>
        <div
          className={
            validation.password && submit
              ? "password-field"
              : "password-field invalid"
          }
        >
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            type="password"
            sx={{ background: "white", width: "30vmax" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>Password must be above 8 Character</span>
        </div>
        <Link className="forgot-password" to="/auth/forgot/password">
          Forgot Password
        </Link>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
