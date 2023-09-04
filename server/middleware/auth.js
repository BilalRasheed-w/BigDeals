import User from "../models/userM.js";
import Jwt from "jsonwebtoken";
import { asyncHandler, customError } from "../Error/globalError.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    throw new customError("your session has expired, pls login again", 401);
  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

const isAuthorized = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") throw new customError("Only Admins Can Access This Route", 403);
  next();
});

// for reset link
const VerifyJwt =asyncHandler(async (req, res, next) => {
  const token = req.params.token
  if (!token)
    throw new customError("your link  has expired, pls try again", 400);
  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findOne({email:decodedData.email});
  next();
})



export { isAuthenticated, isAuthorized,VerifyJwt };
