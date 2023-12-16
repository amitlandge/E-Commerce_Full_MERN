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
  adminAllProductsAction,
  deleteProductAction,
} from "../../Actions/productActions";
const AllProducts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginRegister);
  const { products, loading } = useSelector((state) => state.adminProducts);
  const { success } = useSelector((state) => state.deleteProduct);
  const deleteProductHandler = (id) => {
    dispatch(deleteProductAction(id));
  };
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 300, flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.id}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => {
                deleteProductHandler(params.id);
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

  products &&
    products.forEach((item, index) => {
      rows.push({
        stock: item.stock,
        id: item._id,
        name: item.name,
        price: item.price,
      });
    });
  useEffect(() => {
    dispatch(adminAllProductsAction());
    if (success) {
      dispatch(adminAllProductsAction());
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

export default AllProducts;
