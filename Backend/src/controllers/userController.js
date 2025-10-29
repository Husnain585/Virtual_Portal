// controllers/userController.js
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import crypto from "crypto";

// Register user - Only allow student and teacher roles
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, lastName, email, password, role = "student" } = req.body;

  // Validate role - only allow student or teacher during registration
  const allowedRoles = ["student", "teacher"];
  if (role && !allowedRoles.includes(role.toLowerCase())) {
    return next(new ErrorHandler("Registration is only allowed for student or teacher roles", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    return next(new ErrorHandler("User already exists with this email", 400));
  }

  const user = await User.create({ 
    name: name.trim(), 
    lastName: lastName.trim(), 
    email: email.toLowerCase().trim(), 
    password, 
    role: role.toLowerCase() 
  });

  // Update last login
  await user.updateLastLogin();

  sendToken(user, 201, res);
});

// Login user
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Trim and lowercase email
  const trimmedEmail = email.trim().toLowerCase();
  
  const user = await User.findOne({ email: trimmedEmail }).select("+password");
  
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new ErrorHandler("Your account has been deactivated. Please contact administrator.", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);
  
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Update last login
  await user.updateLastLogin();

  sendToken(user, 200, res);
});

// Logout user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { 
    expires: new Date(Date.now()), 
    httpOnly: true 
  });
  
  res.status(200).json({ 
    success: true, 
    message: "Logged out successfully." 
  });
});

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
  
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // In a real application, you would send an email here
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
  const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

  try {
    // await sendEmail({ email: user.email, subject: "Password Recovery", message });
    console.log('Password reset URL:', resetPasswordUrl); // For development
    
    res.status(200).json({ 
      success: true, 
      message: `Password reset email sent to ${user.email}`,
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined // Only in development
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get current user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({ 
    success: true, 
    user 
  });
});

// Update password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  
  sendToken(user, 200, res);
});

// Update profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name?.trim(),
    lastName: req.body.lastName?.trim(),
    email: req.body.email?.toLowerCase().trim(),
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ 
    success: true, 
    user 
  });
});

// ========== ADMIN ONLY ROUTES ==========

// Get all users (Admin only)
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().select("-password");
  
  res.status(200).json({ 
    success: true, 
    users,
    count: users.length 
  });
});

// Get single user (Admin only)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  
  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
  }
  
  res.status(200).json({ 
    success: true, 
    user 
  });
});

// Update user role (Admin only) - Can assign any role including admin
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name?.trim(),
    lastName: req.body.lastName?.trim(),
    email: req.body.email?.toLowerCase().trim(),
    role: req.body.role?.toLowerCase(),
    isActive: req.body.isActive
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 404));
  }

  res.status(200).json({ 
    success: true, 
    user,
    message: "User role updated successfully"
  });
});

// Delete user (Admin only) - Soft delete by setting isActive to false
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id, 
    { isActive: false }, 
    { new: true }
  ).select("-password");

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 404));
  }

  res.status(200).json({ 
    success: true, 
    message: "User deactivated successfully" 
  });
});

// Activate user (Admin only)
export const activateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id, 
    { isActive: true }, 
    { new: true }
  ).select("-password");

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 404));
  }

  res.status(200).json({ 
    success: true, 
    message: "User activated successfully",
    user 
  });
});