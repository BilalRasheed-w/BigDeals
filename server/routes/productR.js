import express from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "../controllers/productC.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/product/new", isAuthenticated, isAuthorized, createProduct);

router
  .route("/product/:id")
  .get(getOneProduct)
  .put(isAuthenticated, isAuthorized, updateProduct)
  .delete(isAuthenticated, isAuthorized, deleteProduct);

export default router;
