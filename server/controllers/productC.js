import { asyncHandler, customError } from "../Error/globalError.js";
import Product from "../models/productM.js";
import ApiFeatures from "../utils/apiFeatures.js";

const getProducts = async (req, res, next) => {
  const NumOfProducts = await Product.countDocuments();
  const resultPerPage = 10;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(201).json({ success: true, NumOfProducts, products });
};

const createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
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

const createProductReview = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { rating, comment, productId } = req.body;
  const review = {
    user: user._id,
    name: user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  })
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  if (isReviewed) {
    res.status(200).json({ msg: "Review Updated Successfully" });
  } else {
    res.status(200).json({ msg: "Review Submitted Successfully" });
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.body.id);
  const numOfProducts = await Product.countDocuments();
  res.status(200).json({ numOfProducts, deletedProduct: product });
});

export {
  getProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  createProductReview,
  deleteProduct,
};
