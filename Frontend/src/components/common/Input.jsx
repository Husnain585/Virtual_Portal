// src/common/Input.jsx
import React from "react";

const Input = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  className = "",
  autoComplete, // Add this prop
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete} // Add this line
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300 w-full"
        {...props}
      />
    </div>
  );
};

export default Input;