import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE}/auth/users/reset_password/`, { email });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>

        {submitted ? (
          <div className="text-green-600 text-center">
            ✅ If an account exists with that email, we’ve sent a password reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <button
          onClick={() => navigate('/login')}
          className="mt-6 text-sm text-gray-500 hover:text-blue-600 block text-center"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
