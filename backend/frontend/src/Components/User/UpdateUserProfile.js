import React, { useState, Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../Actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstants";
import { TextField } from "@mui/material";

const UpdateUserProfile = () => {
  const { user } = useSelector((state) => state.userLoginRegister);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);

  const loadUpdateContent = async () => {
    setName(user.name);
    setEmail(user.email);
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();

    console.log(email, name);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    loadUpdateContent();
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/auth/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }

    // eslint-disable-next-line
  }, [error, dispatch, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Update Profile</h1>
          <form className="form" onSubmit={updateProfileHandler}>
            <div className="profile-image">
              <img src={user && user.avatar.url} alt={user.name} />
            </div>
            <TextField
              id="outlined-required"
              label="Name"
              variant="outlined"
              value={name}
              type="text"
              sx={{ background: "white", width: "30vmax" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
                  setAvatar(e.target.files[0]);
                }}
              />
              Upload File
            </Button>
            {avatar && (
              <div className="uploaded-image">
                <img src={URL.createObjectURL(avatar)} alt="profilepicture" />
              </div>
            )}
            <Button variant="contained" type="submit">
              Update Profile
            </Button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateUserProfile;
