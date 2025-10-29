// models/userModel.js
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [30, "Name should not be longer than 30 characters"],
    minLength: [4, "Name should be longer than 4 characters"],
    required: [true, "Name is required"],
    trim: true
  },
  lastName: {
    type: String,
    maxLength: [30, "Last name should not be longer than 30 characters"],
    minLength: [2, "Last name should be longer than 2 characters"],
    required: [true, "Last name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password should be more than 8 characters"],
    select: false,
    validate: {
      validator: function(password) {
        return validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message: "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    }
  },
  role: {
    type: String,
    enum: {
      values: ["student", "teacher", "admin"],
      message: "Role must be either student, teacher, or admin"
    },
    default: "student",
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// JWT Token generator
userSchema.methods.getJwTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || process.env.EXPIRES_IN || "7d",
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken;
};

// Update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.name} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);
export default User;