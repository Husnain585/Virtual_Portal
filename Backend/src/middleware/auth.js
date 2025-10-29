import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Middleware: Check if user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }

  const decodeData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decodeData.id);

  next();
});

// Middleware: Authorize specific roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
