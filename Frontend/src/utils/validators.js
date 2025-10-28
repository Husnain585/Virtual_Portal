// src/utils/validators.js

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Minimum 8 chars, at least 1 letter & 1 number
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

export const validateRequired = (value) => value && value.trim().length > 0;

export const validateCourse = ({ name, code, creditHours }) => {
  const errors = {};
  if (!validateRequired(name)) errors.name = "Course name is required";
  if (!validateRequired(code)) errors.code = "Course code is required";
  if (!creditHours || isNaN(creditHours)) errors.creditHours = "Credit hours must be a number";
  return errors;
};

export const validateRegister = ({ firstName, lastName, email, password }) => {
  const errors = {};
  if (!validateRequired(firstName)) errors.firstName = "First name is required";
  if (!validateRequired(lastName)) errors.lastName = "Last name is required";
  if (!validateEmail(email)) errors.email = "Invalid email format";
  if (!validatePassword(password)) errors.password = "Password must be at least 8 characters, including letters and numbers";
  return errors;
};
