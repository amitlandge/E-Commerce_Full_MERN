import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoutes = () => {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.userLoginRegister
  );

  return (
    <>
      {loading === false && (
        <Fragment>
          <div>
            {isAuthenticated === true && user?.role === "admin" ? (
              <Outlet />
            ) : (
              <Navigate to="/" />
            )}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default PrivateAdminRoutes;
