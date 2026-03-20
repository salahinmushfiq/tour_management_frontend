// // src/pages/Unauthorized.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Unauthorized = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-md text-center">
//         <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
//         <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
//         <p className="text-gray-600 mb-6">
//           You don’t have permission to access this page. Please login with the correct role.
//         </p>
//         <Link
//           to="/"
//           className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Unauthorized;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiArrowLeft, FiUserCheck, FiShieldOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Assuming your context has a logout function

  const handleSwitchAccount = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-6 bg-brand-dark absolute">
      <div className="max-w-md w-full text-center space-y-8 bg-black/10 backdrop-blur-lg p-6 rounded-md">
        
        {/* --- Iconic Warning Section --- */}
        <div className="relative inline-block">
          <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-full text-red-500 dark:text-red-400">
            <FiShieldOff size={80} className="animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-red-100 dark:border-red-900/30">
            <FiLock className="text-red-600" size={24} />
          </div>
        </div>

        {/* --- Text Content --- */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            You don't have the necessary permissions to view this trail. 
            This area is reserved for specialized roles.
          </p>
        </div>

        {/* --- Information Box --- */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-4 rounded-2xl">
          <p className="text-sm text-amber-800 dark:text-amber-400 flex items-center justify-center gap-2">
            <FiUserCheck /> 
            Think this is a mistake? Try logging in with a different role.
          </p>
        </div>

        {/* --- Actions --- */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg"
          >
            Return to Dashboard
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-gray-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium"
            >
              <FiArrowLeft /> Go Back
            </button>
            
            <button
              onClick={handleSwitchAccount}
              className="flex-1 py-3 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;