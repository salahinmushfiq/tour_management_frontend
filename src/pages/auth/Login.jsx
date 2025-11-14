import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SocialLoginButton from "../../components/SocialLoginButton";
import TouristWrapper from "./TouristWrapper";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, socialLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouristWrapper scene="dusk">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto px-4 py-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-100">
            Welcome Back
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Continue your journey with us
          </p>
        </motion.div>

        {error && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-4 text-red-400 font-medium"
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

          {/* Password with toggle */}
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl font-semibold text-gray-100 transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-accent hover:bg-accent-dark shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-3 text-gray-400">or continue with</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <div className="space-y-3">
          <SocialLoginButton provider="google" onSuccess={socialLogin} />
          <SocialLoginButton provider="facebook" onSuccess={socialLogin} />
        </div>

        <p className="mt-6 text-center text-gray-100">
          New here?{" "}
          <Link
            to="/register"
            className="text-accent font-semibold underline hover:text-accent-dark transition"
          >
            Join the adventure
          </Link>
        </p>
      </motion.div>
    </TouristWrapper>
  );
}
