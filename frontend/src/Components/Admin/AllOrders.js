import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../Layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Edit, Delete } from "@mui/icons-material";
import Loader from "../Layout/Loader";
import { Button, Typography } from "@mui/material";

import {
  deleteOrderAction,
  getAllOrderAction,
} from "../../Actions/orderAction";
import { DELETE_ORDER_RESET } from "../../Constants/orderConstants";
const AllOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginRegister);

  const { orders, loading } = useSelector((state) => state.getAllOrders);
  const { success } = useSelector((state) => state.deleteOrder);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderAction(id));
  };
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemQty",
      headerName: "itemQty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
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
            <Link to={`/admin/process/${params.id}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => {
                deleteOrderHandler(params.id);
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

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        totalPrice: item.totalPrice,
      });
    });
  useEffect(() => {
    dispatch(getAllOrderAction());
    if (success) {
      dispatch(getAllOrderAction());
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, success]);
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

export default AllOrders;
