import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await axios.post(`${API_BASE}/auth/users/reset_password_confirm/`, {
        uid,
        token,
        new_password: password,
      });
      setMessage("Password has been reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError("Reset failed. The link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Set New Password</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2" htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          required
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <label className="block mb-2" htmlFor="passwordConfirm">Confirm New Password</label>
        <input
          type="password"
          id="passwordConfirm"
          required
          className="w-full p-2 border rounded mb-4"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetConfirm;
