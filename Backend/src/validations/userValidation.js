// validations/userValidation.js
import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  role: Joi.string().valid("student", "instructor", "admin"),
  enrolledCourses: Joi.array().items(Joi.string().hex().length(24)), // ObjectId format
});
