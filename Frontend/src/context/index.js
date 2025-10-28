// src/contexts/index.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { CourseProvider } from "./CourseContext";
import { UIProvider } from "./UIContext";
import { ToastProvider } from "./ToastContext";
import { ThemeProvider } from "./ThemeContext";

export const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <CourseProvider>
              <UIProvider>{children}</UIProvider>
            </CourseProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
