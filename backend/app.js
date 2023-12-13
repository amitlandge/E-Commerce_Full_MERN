const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const db = require("./Database/db");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
// Database Connection
// if (process.env.PRODUCTION !== "PRODUCTION") {
// }
db();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// Routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", paymentRoutes);
module.exports = app;

app.use("/auth/", userRoutes);
app.use("/order/", orderRoutes);
app.use("/payment/", paymentRoutes);
