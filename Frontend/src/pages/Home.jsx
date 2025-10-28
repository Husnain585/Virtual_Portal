// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const Home = () => {
  return (
    <div className="text-center py-16 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Digital Learning Portal
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Learn, teach, and manage courses seamlessly.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
