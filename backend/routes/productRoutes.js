const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  adminAllProducts,
  reviewsProduct,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();
router.get("/product", getAllProducts);
router.post("/product/create", auth, isAdmin("admin"), createProduct);
router.put("/product/update/:id", auth, isAdmin("admin"), updateProduct);
router.delete("/product/delete/:id", auth, isAdmin("admin"), deleteProduct);
router.get("/product/admin", auth, isAdmin("admin"), adminAllProducts);
router.get("/product/:id", getSingleProduct);
router.post("/product/review", auth, reviewsProduct);
router.get("/product/review/:productId", getAllReviews);
router.delete("/product/review/", auth, deleteReview);
module.exports = router;
