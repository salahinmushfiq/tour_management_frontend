//src/pages/auth/Login.jsx 
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SocialLoginButton from "../../components/Auth/SocialLoginButton";
import {AuthWrapper} from "../../components";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Lock, Mail } from "lucide-react";

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
    <AuthWrapper scene="dusk">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto px-4 py-10 -m-12 sm:m-0"
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
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-600 pl-12 px-4 py-2 rounded-xl bg-gray-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password with toggle */}
          <div className="relative">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />

              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-600 pl-12 px-4 py-2 rounded-xl bg-gray-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
    </AuthWrapper>
  );
}
// // src/pages/auth/Login.jsx 
// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";
// import SocialLoginButton from "../../components/SocialLoginButton";
// import TouristWrapper from "./TouristWrapper";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login, socialLogin } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await login(email, password);
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClasses = "w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300";

//   return (
//     <TouristWrapper scene="dusk">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full"
//       >
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight selection:bg-emerald-500/30">
//             Welcome Back
//           </h2>
//           <p className="text-blue-200/80 mt-2 font-medium">
//             Continue your discovery journey
//           </p>
//         </div>

//         {error && (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-semibold"
//           >
//             {error}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="relative">
//             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={20} />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className={inputClasses}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500  z-10" size={20} />
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="Password"
//               className={inputClasses}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//             >
//               {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {loading ? "Discovering..." : "Start Adventure"}
//           </button>
//         </form>

//         <div className="relative my-8">
//           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
//           <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-gray-500 font-bold tracking-widest">or continue with</span></div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <SocialLoginButton provider="google" onSuccess={socialLogin} />
//           <SocialLoginButton provider="facebook" onSuccess={socialLogin} />
//         </div>

//         <p className="mt-10 text-center text-sm text-gray-400 font-medium selection:bg-blue-500/30">
//           New here?{" "}
//           <Link to="/register" className="text-blue-400 font-bold hover:text-emerald-400 transition-colors underline decoration-2 underline-offset-4">
//             Join the adventure
//           </Link>
//         </p>
//       </motion.div>
//     </TouristWrapper>
//   );
// }