import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxLength: [8, "Product Is Overpriced"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Product description"],
    },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      default: 1,
      maxLength: [4, "stock cannot exceed 4 characters"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        imgUrl: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const model = mongoose.model("Product", ProductSchema);

export default model;
