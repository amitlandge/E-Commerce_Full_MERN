const express = require("express");
const {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();
router.post("/order/create", auth, createOrder);
router.get("/order/user/:id", auth, getSingleOrder);
router.get("/order/myOrder", auth, myOrders);
router.get("/order/allOrders", auth, isAdmin("admin"), getAllOrders);
router.put("/order/update/:id", auth, isAdmin("admin"), updateOrder);
router.delete("/order/delete/:id", auth, deleteOrder);
module.exports = router;
