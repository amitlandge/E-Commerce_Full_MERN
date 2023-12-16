import { Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import "./Dashboard.css";
import { Divider } from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminAllProductsAction } from "../../Actions/productActions";
import { getAllOrderAction } from "../../Actions/orderAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const { orders } = useSelector((state) => state.getAllOrders);
  const { users } = useSelector((state) => state.getAllUsers);
  let totalAmount = 0;
  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });
  const total = totalAmount.toFixed(2);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, total],
      },
    ],
  };


  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );

  useEffect(() => {
    dispatch(adminAllProductsAction());
    dispatch(getAllOrderAction());
  }, [dispatch]);
  return (
    <div>
      <Sidebar />
      <Divider />
      <div className="dashboard_container">
        <h2>Dashboard</h2>
        <div className="totalAmount">
          <h3>Total Amount</h3>
          <p>{total} Rs</p>
        </div>
        <div className="data">
          <div className="totalProduct" style={{ background: "Purple" }}>
            <h3>Product</h3>
            <p>{products && products.length}</p>
          </div>
          <div className="totalOrders" style={{ background: "orange" }}>
            <h3>Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="totalUser" style={{ background: "gray" }}>
            <h3>Users</h3>
            <p>{users.length}</p>
          </div>
        </div>
      </div>
      <div className="chart">
        <Line data={lineState} />
      </div>
      <div className="doughnut">{/* <Doughnut data={doughnutState} /> */}</div>
    </div>
  );
};

export default Dashboard;
