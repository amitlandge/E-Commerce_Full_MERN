import React, { useEffect, useState } from "react";

import "./Form.css";
import Loader from "../Layout/Loader";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CLEAR_ERROR } from "../../Constants/userConstants";
const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    password: true,
  });
  const [submit, setSubmit] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const isNameValid = name.trim().length > 0;
  const isEmailValid = email.trim().includes("@");
  const isPasswordValid = password.trim().length === 8;
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.userLoginRegister
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
    if (isAuthenticated) {
      navigate("/auth/account");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const submitUserData = (event) => {
    event.preventDefault();
    setSubmit(true);
    setValidation({
      name: isNameValid,
      email: isEmailValid,
      password: isPasswordValid,
    });
    if (isEmailValid && isEmailValid && isPasswordValid && image) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      // alert("Form Succesfully Submited");
      dispatch(registerUser(formData));
    }
  };
try {
  
} catch (error) {
  
}
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={submitUserData} className="form">
          <h1>Register</h1>
          <div
            className={
              validation.name && submit ? "name-field" : "name-field invalid"
            }
          >
            <TextField
              id="outlined-required"
              label="Name"
              variant="outlined"
              value={name}
              type="name"
              sx={{ background: "white", width: "30vmax" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span>Please Enter Your Name</span>
          </div>
          <div
            className={
              validation.email && submit ? "email-field" : "email-field invalid"
            }
          >
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
              id="outlined-required"
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              sx={{ background: "white", width: "30vmax" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span>Password must be 8 Character</span>
          </div>
          <div className="profile-image">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              <input
                type="file"
                placeholder="something"
                style={{ display: "none" }}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              Upload File
            </Button>
            {image && (
              <div className="uploaded-image">
                <img src={URL.createObjectURL(image)} alt="profilepicture" />
              </div>
            )}
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default SignUpForm;
