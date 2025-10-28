// src/layout/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Digital Learning Portal · All Rights Reserved
    </footer>
  );
};

export default Footer;
