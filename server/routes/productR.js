import express from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "../controllers/productC.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/product/new", createProduct);

router
  .route("/product/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
