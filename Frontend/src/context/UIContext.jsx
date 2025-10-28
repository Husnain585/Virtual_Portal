// src/contexts/UIContext.jsx
import React, { createContext, useState, useEffect } from "react";
import localStorageService from "../services/localStorage.service";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(localStorageService.get("theme") || "light");
  const [modal, setModal] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorageService.set("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <UIContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        theme,
        toggleTheme,
        modal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
