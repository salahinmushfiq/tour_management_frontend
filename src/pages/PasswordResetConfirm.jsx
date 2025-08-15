import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== reNewPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/auth/users/reset_password_confirm/`, {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      });
      setSubmitted(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError('Invalid or expired reset link.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Set New Password</h2>

        {submitted ? (
          <div className="text-green-600 text-center">
            ✅ Password has been reset. Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
            >
              Reset Password
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

export default PasswordResetConfirm;
