import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrderAction } from "../../../Actions/orderAction";
import { Fragment } from "react";
import Loader from "../../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import MetaData from "../../Layout/MetaData";
import { Link } from "react-router-dom";
import LounchIcon from "@mui/icons-material/Launch";
import "./MyOrder.css";
import { toast } from "react-toastify";
const MyOrder = () => {
  const { orders, error, loading } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userLoginRegister);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
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
          <Link to={`/auth/order/${params.id}`}>
            <LounchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(myOrderAction());
  }, [dispatch, error]);
  return (
    <div>
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

export default MyOrder;
