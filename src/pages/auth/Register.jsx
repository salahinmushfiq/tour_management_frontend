import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TouristWrapper from "./TouristWrapper";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

      navigate("/login");
    } catch (err) {
      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Registration failed. Please check your inputs.");
      }
    }
  };

  return (
    <TouristWrapper scene="night">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto px-4 py-10"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-100">
          Start Your Journey
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Create your account to begin
        </p>

        {error && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-4 text-red-400 font-medium whitespace-pre-wrap"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-600 px-4 py-2 rounded-xl bg-gray-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password 1 */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-600 px-4 py-2 rounded-xl bg-gray-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-100"
            >
              {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border border-gray-600 px-4 py-2 rounded-xl bg-gray-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass2(!showPass2)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-100"
            >
              {showPass2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-dark text-gray-100 font-semibold py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-100">
          Already on the adventure?{" "}
          <Link
            to="/login"
            className="text-accent font-semibold underline hover:text-accent-dark transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </TouristWrapper>
  );
}
