// validations/courseValidation.js
import Joi from "joi";

export const courseSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().allow(""),
  instructor: Joi.string().hex().length(24), // optional when creating via logged-in user
});
