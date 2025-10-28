// src/utils/roles.js

export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Administrator",
  [ROLES.TEACHER]: "Teacher",
  [ROLES.STUDENT]: "Student",
};

export const roleColors = {
  [ROLES.ADMIN]: "bg-red-100 text-red-800",
  [ROLES.TEACHER]: "bg-blue-100 text-blue-800",
  [ROLES.STUDENT]: "bg-green-100 text-green-800",
};

export const canAccess = (userRole, allowedRoles = []) =>
  allowedRoles.includes(userRole);

export const isAdmin = (role) => role === ROLES.ADMIN;
export const isTeacher = (role) => role === ROLES.TEACHER;
export const isStudent = (role) => role === ROLES.STUDENT;
