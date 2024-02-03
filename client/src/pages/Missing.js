
import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">Page not found</p>
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Click here to go to Register Page
        </Link>
      </div>
    </div>
  );
};

export default Missing;
