// validations/assignmentValidation.js
import Joi from "joi";

export const assignmentSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().allow(""),
  dueDate: Joi.date().greater("now").required().messages({
    "date.greater": "Due date must be in the future",
  }),
});
