import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.userLoginRegister
  );

  return (
    <>
      {loading === false && (
        <Fragment>
          <div>
            {isAuthenticated === true ? (
              <Outlet />
            ) : (
              <Navigate to="/auth/login" />
            )}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default PrivateRoutes;
