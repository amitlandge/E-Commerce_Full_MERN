import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Layout/Header";

import Footer from "./Components/Layout/Footer";

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Loader from "./Components/Layout/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/Product/ProductDetails";
import ProductPage from "./Components/Product/ProductPage/ProductPage";
import SearchForm from "./Components/Product/ProductPage/SearchForm";
import LoginForm from "./Components/User/LoginForm";
import SignUpForm from "./Components/User/SignUpForm";
import store from "./store/store";
import { loadUser } from "./Actions/userActions";
import Profile from "./Components/User/Profile";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import UpdateUserProfile from "./Components/User/UpdateUserProfile";
import ChangePassword from "./Components/User/ChangePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Cart from "./Components/Cart/Cart";
import ShippingForm from "./Components/User/ShippingForm";
import Order from "./Components/User/Order";
import Payment from "./Components/User/Payment";
import axios from "axios";
import Success from "./Components/Layout/Success";
import MyOrder from "./Components/User/Order/MyOrder";
import MyOrderDetails from "./Components/User/Order/MyOrderDetails";
import PrivateAdminRoutes from "./PrivateRoutes/PrivateAdminRoutes";
import Dashboard from "./Components/Admin/Dashboard";
import AllProducts from "./Components/Admin/AllProducts";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import CreateProduct from "./Components/Admin/CreateProduct";
import AllOrders from "./Components/Admin/AllOrders";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import Users from "./Components/Admin/Users";
import UpdateUser from "./Components/Admin/UpdateUser";
import NoFound from "./Components/Layout/NoFound";
import { useSelector } from "react-redux";

function App() {
  const [stripeKey, setStripeKey] = useState();
  const { isAuthenticated } = useSelector((state) => state.userLoginRegister);
  const getStripeKey = async () => {
    const { data } = await axios.get("/api/v1/payment/secretKey");
    setStripeKey(data);
    console.log(data);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    if (isAuthenticated) {
      getStripeKey();
    }
    // window.addEventListener("contextmenu", (e) => e.preventDefault());
    // eslint-disable-next-line
  }, []);

  console.log(stripeKey);
  return (
    <Fragment>
      <nav>
        <Header />
      </nav>

      <main>
        <Routes>
          <Route index={true} path="/" element={<Home />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/search" element={<SearchForm />} />
          <Route path="/products/:keyword" element={<ProductPage />} />

          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/signup" element={<SignUpForm />} />
          <Route path="/auth/" element={<PrivateRoutes />}>
            <Route index path="cart" element={<Cart />} />
            <Route index path="account" element={<Profile />} />
            <Route
              index
              path="account/update/:uid"
              element={<UpdateUserProfile />}
            />
            <Route index path="account/password" element={<ChangePassword />} />
            <Route path="shipping" element={<ShippingForm />} />
            <Route path="order/confirm" element={<Order />} />
            <Route
              path="payment/process"
              element={<Payment stripeKey={stripeKey && stripeKey} />}
            />
            <Route path="success" element={<Success />} />
            <Route path="order/me" element={<MyOrder />} />
            <Route path="order/:id" element={<MyOrderDetails />} />
          </Route>
          <Route element={<PrivateAdminRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/create/" element={<CreateProduct />} />
            <Route path="/admin/orders" element={<AllOrders />} />
            <Route path="/admin/process/:id" element={<ProcessOrder />} />
            <Route path="/admin/users/" element={<Users />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          </Route>
          <Route path="/auth/forgot/password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </main>
      <ToastContainer />

      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
}

export default App;
