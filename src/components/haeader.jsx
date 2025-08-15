import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-primary-light dark:bg-primary-dark text-white">
      <Link to="/dashboard" className="font-bold text-xl">Tour Management</Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-accent-alt px-3 py-1 rounded hover:bg-accent-light transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
