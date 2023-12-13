import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Button } from "@mui/material";
const Profile = () => {
  const navigate = useNavigate();
  const date = new Date().toJSON().substring(0, 10);
  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.userLoginRegister
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [error, isAuthenticated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="profile-heading">My Profile</h1>
          <div className="profile-container">
            <div className="profile-image-container">
              <img
                src={
                  user
                    ? user.avatar?.url
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="user"
              />
              <Button>
                <Link
                  to={`/auth/account/update/${user._id}`}
                  className="cartBtn update-btn"
                  style={{ textDecoration: "none" }}
                >
                  Update Profile
                </Link>
              </Button>
            </div>
            <div className="profile-description">
              <div className="name">
                <h2>Full Name</h2>
                <p>{user.name}</p>
              </div>
              <div className="email">
                <h2>Email</h2>
                <p>{user.email}</p>
              </div>
              <div className="join">
                <h2>Joined Date</h2>
                <p>{date}</p>
              </div>
              <div className="profile-btn">
                <Button variant="contained">
                  <Link to="/auth/order/me">My Orders</Link>
                </Button>

                <Button variant="contained" style={{ background: "gray" }}>
                  <Link to="/auth/account/password">Change Password</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
