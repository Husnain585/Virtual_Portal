// src/hooks/useRole.js
import { useAuth } from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const role = user?.role || null;

  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";
  const isStudent = role === "student";

  const hasRole = (roles = []) => roles.includes(role);

  return { role, isAdmin, isTeacher, isStudent, hasRole };
};

export default useRole;
