const express = require("express");

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
if (process.env.NODE_PRODUCTION !== "PRODUCTION") {
  require("dotenv").config();
}
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

// Routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", paymentRoutes);

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
  res.setHeader("Content-Type", "text/html");
});

module.exports = app;
