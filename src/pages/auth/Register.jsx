import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/`, {
        email,
        password,
        re_password: password2,
      });
      // Registration success, redirect to login
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your inputs.');
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-6 font-semibold text-center">Register</h2>
      {error && <p className="mb-4 text-red-600 whitespace-pre-wrap">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
      </p>
    </div>
  );
}

export default Register;
