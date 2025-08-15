// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page. Please login with the correct role.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
