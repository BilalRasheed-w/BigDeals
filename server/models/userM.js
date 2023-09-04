import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
      minLength: [4, "Name Should Have Atleast 4 Characters"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter Valid Email"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minLength: [8, "Password Should Have Atleast 8 Characters"],
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      imageUrl: {
        type: String,
        required: true,
      },
    },
 },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.getJwtToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const model = mongoose.model("User", userSchema);
export default model;
