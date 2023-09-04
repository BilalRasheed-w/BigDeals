
import express from "express";
import {
  ForgotPassword,
  deleteUser,
  getAllUsers,
  getOneUser,
  getUserDetails,
  loginUser,
  logout,
  makeAdmin,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/userC.js";
import {
  VerifyJwt,
  isAuthenticated,
  isAuthorized as isAdmin,
} from "../middleware/auth.js";
const router = express.Router();

//@ user routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logout);

router.get("/user/me", isAuthenticated, getUserDetails);

router.post("/user/profile", isAuthenticated, updateProfile);

router.post("/user/password", isAuthenticated, updatePassword);
router.post("/user/forgot", ForgotPassword);
router.put("/user/reset/:token", VerifyJwt, resetPassword);

//! admin routes
router.get("/admin/users", isAuthenticated, isAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, isAdmin, getOneUser)
  .put(isAuthenticated, isAdmin, makeAdmin)
  .delete(isAuthenticated, isAdmin, deleteUser);

export default router;
