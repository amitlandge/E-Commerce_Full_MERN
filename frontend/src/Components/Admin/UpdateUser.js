import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../Layout/Loader";

import {
  getSingleUserAction,
  updateUserStatusAction,
} from "../../Actions/userActions";
import { UPDATE_USER_STATUS_RESET } from "../../Constants/userConstants";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user, loading } = useSelector((state) => state.getSingleUser);
  const { success } = useSelector((state) => state.updateUserRole);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  console.log(params.id);

  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(getSingleUserAction(params.id));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }

    if (success) {
      navigate("/admin/users");
      dispatch(getSingleUserAction(params.id));
      dispatch({ type: UPDATE_USER_STATUS_RESET });
    }
  }, [dispatch, params.id, success, user, navigate]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    if (name && email && role) {
      dispatch(updateUserStatusAction(params.id, formData));
    } else {
      toast.error("Please Insert All the Fields");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Sidebar />
          <div className="createform">
            <form className="form" onSubmit={updateUserHandler}>
              <div>
                <TextField
                  id="outlined-uncontrolled"
                  placeholder="User Name"
                  variant="filled"
                  value={name}
                  type="text"
                  sx={{ background: "white", width: "30vmax" }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div>
                <TextField
                  id="outlined-uncontrolled"
                  placeholder="Product Name"
                  variant="filled"
                  value={email}
                  type="email"
                  sx={{ background: "white", width: "30vmax" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  defaultValue={role}
                  label="Select Role"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  style={{ width: "30vmax", paddingLeft: "2vmax" }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </div>

              <Button variant="contained" type="submit">
                Update User
              </Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateUser;
