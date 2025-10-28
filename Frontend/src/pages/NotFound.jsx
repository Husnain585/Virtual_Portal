// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-gray-600 text-lg mt-2 mb-6">
      Oops! The page you’re looking for doesn’t exist.
    </p>
    <Link
      to="/"
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
