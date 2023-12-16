import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearErrors, forgotPasswordAction } from "../../Actions/userActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, success } = useSelector((state) => state.forgotPassword);
  const params = useParams();
  const changePasswordHandler = (e) => {
    e.preventDefault();
    console.log(params.token);
    dispatch(forgotPasswordAction(password, confirmPassword, params.token));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Password Reset Succesfully");
      navigate("/auth/login");
    }
  }, [error, success, dispatch, navigate]);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>Reset Password</h1>
      <form className="form" onSubmit={changePasswordHandler}>
        <TextField
          id="outlined-required"
          label="New Password"
          variant="outlined"
          value={password}
          type="password"
          sx={{ background: "white", width: "30vmax" }}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />

        <TextField
          id="outlined-required"
          label="Confirm New Password"
          variant="outlined"
          value={confirmPassword}
          type="password"
          sx={{ background: "white", width: "30vmax" }}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        <Button variant="contained" type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
