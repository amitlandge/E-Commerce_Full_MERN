import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Edit, Delete } from "@mui/icons-material";
import Loader from "../Layout/Loader";
import { Button, Typography } from "@mui/material";

import { deleteUserAction, getAllUsersAction } from "../../Actions/userActions";
import { toast } from "react-toastify";
import { DELETE_USER_RESET } from "../../Constants/userConstants";
const Users = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginRegister);

  const { users, loading } = useSelector((state) => state.getAllUsers);

  const { success, error } = useSelector((state) => state.deleteUser);

  const deleteUserHandler = (id) => {
    dispatch(deleteUserAction(id));
  };
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 300, flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 250,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      type: "text",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.id}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => {
                deleteUserHandler(params.id);
              }}
            >
              <Delete
                style={{ margin: "1vmax", cursor: "pointer", color: "red" }}
              />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  users &&
    users.forEach((item, index) => {
      rows.push({
        name: item.name,
        id: item._id,
        email: item.email,
        role: item.role,
      });
    });
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (error) {
      toast.error(error);
    }
    if (success) {
      dispatch(getAllUsersAction());
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, success]);
  return (
    <div>
      <Sidebar />
      <Fragment>
        <MetaData title={`${user.name} - Orders`} />

        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default Users;
