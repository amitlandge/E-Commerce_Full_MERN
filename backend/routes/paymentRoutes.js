const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { payment, sendSecreteKey } = require("../controllers/paymentController");
router.post("/payment/process", payment);
router.get("/payment/secretKey", auth, sendSecreteKey);
module.exports = router;
