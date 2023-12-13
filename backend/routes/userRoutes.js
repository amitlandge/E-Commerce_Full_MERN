const express = require("express");
const {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", auth, getUserDetails);
router.put("/update", auth, updatePassword);
router.put("/me/update", auth, updateProfile);
router.get("/admin/allUser", auth, isAdmin("admin"), getAllUser);
router
  .get("/admin/user/:id", auth, isAdmin("admin"), getSingleUser)
  .put("/admin/user/:id", auth, isAdmin("admin"), updateUserRole)
  .delete("/admin/user/:id", auth, isAdmin("admin"), deleteUser);
module.exports = router;
