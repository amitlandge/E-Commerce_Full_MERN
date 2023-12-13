import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword, clearErrors } from "../../Actions/userActions";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_RESET } from "../../Constants/userConstants";
import Loader from "../Layout/Loader";
import { Button, TextField } from "@mui/material";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userLoginRegister);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (!oldPassword && !newPassword && !confirmPassword) {
      toast.error("Please Fill All Information");
    }
    dispatch(
      changePassword({
        oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      })
    );
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      navigate("/auth/account/");
      toast("Change Password Successfully");
      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
  }, [error, dispatch, navigate, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className="form" onSubmit={changePasswordHandler}>
            <div className="profile-image">
              <img src={user && user.avatar.url} alt={user.name} />
            </div>
            <TextField
              id="outlined-required"
              label="Old Password"
              variant="outlined"
              value={oldPassword}
              type="password"
              sx={{ background: "white", width: "30vmax" }}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            <TextField
              id="outlined-required"
              label="New Password"
              variant="outlined"
              value={newPassword}
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
              Change Password
            </Button>
          </form>
        </>
      )}
    </Fragment>
  );
};

export default ChangePassword;
