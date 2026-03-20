//src/pages/auth/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useUIStore } from "../../store/useUIStore";
import {AuthWrapper} from "../../components";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { showSnackbar } = useUIStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      showSnackbar("Passwords do not match.", "warning");
      return;
    }
    try {
      await api.post("/auth/users/", { email, password, re_password: password2 });
      showSnackbar("Account created! Welcome to the journey.", "success");
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      showSnackbar(err?.response.data || err?.response?.data?.message || "Registration failed.", "error");
    }
  };

  const inputClasses = "w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300";

  return (
    <AuthWrapper scene="night">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2 font-medium">Start your discovery journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Choose Password"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Confirm Password"
              className={inputClasses}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 shadow-lg shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400 font-medium">
          Already on the adventure?{" "}
          <Link to="/login" className="text-emerald-400 font-bold hover:text-blue-400 transition-colors underline decoration-2 underline-offset-4">
            Login
          </Link>
        </p>
      </motion.div>
    </AuthWrapper>
  );
}