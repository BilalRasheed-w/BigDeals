import { asyncHandler, customError } from "../Error/globalError.js";
import Product from "../models/productM.js";
import ApiFeatures from "../utils/apiFeatures.js";

const getProducts = async (req, res, next) => {
  const resultPerPage = 10;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(201).json({ success: true, products });
};

const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

const getOneProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new customError("Product not Found", 404);
  res.status(200).json({ product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const productExist = await Product.findById(req.params.id);
  if (!productExist) throw new customError("Product not Found", 404);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ product });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const productExist = await Product.findById(req.params.id);
  if (!productExist) throw new customError("Product Not Found", 404);
  const product = await Product.findByIdAndDelete(req.params.id);
  const remaining_Products = await Product.find();
  res.status(201).json({ product, remaining_Products });
});

export {
  getProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
