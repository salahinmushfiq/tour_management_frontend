// import React, { useState, useRef, useEffect } from 'react';
// import { LogOut, User, Settings, ChevronDown, LayoutDashboardIcon } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { FaDashcube } from 'react-icons/fa';
// const ProfileDropdown = ({ variant = 'organizer' }) => {
//   const { user, logout,countdown } = useAuth();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const onClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', onClickOutside);
//     return () => document.removeEventListener('mousedown', onClickOutside);
//   }, []);

//   const isTourist = variant === 'tourist';

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className={`flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//           isTourist
//             ? 'border-2 border-primary bg-white p-1 shadow-md text-gray-700 dark:text-gray-200'
//             : 'bg-gray-800 p-2 text-white'
//         }`}
//         aria-haspopup="true"
//         aria-expanded={open}
//       >
//         <User className={isTourist ? 'w-6 h-6' : 'w-5 h-5'} />
//         <span className={`hidden sm:inline ${isTourist ? '' : 'font-semibold'}`}>
//           {user?.name || user?.email || 'User'}
//         </span>
//         <ChevronDown
//           className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
//         />
//       </button>

//       {open && (
//         <div
//           className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${
//             isTourist ? 'bg-white text-gray-700' : 'bg-gray-900 text-white'
//           }`}
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="profile-menu"
//         >
//           <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium truncate">
//             {user?.email || 'User'}
//           </div>
//           <button
//             onClick={() => alert('Profile clicked')}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//             role="menuitem"
//           >
//             <User className="w-4 h-4" />
//             Profile
//           </button>
//           <button
          
//             onClick={() => navigate('/dashboard/tourist')}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//             role="menuitem"
//           >
//             <LayoutDashboardIcon className="w-4 h-4" />
//             Dashboard
//           </button>
//             <p>
//               Count Down: {countdown}
//           </p>
//           <button
//             onClick={() => alert('Settings clicked')}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//             role="menuitem"
//           >
//             <Settings className="w-4 h-4" />
//             Settings
//           </button>
//           <div className="border-t border-gray-200 dark:border-gray-700" />
//           <button
//             onClick={logout}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none"
//             role="menuitem"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;
import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings, ChevronDown, LayoutDashboardIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * ProfileDropdown
 * -------------------------
 * Dropdown menu for authenticated users (tourist or organizer).
 * Shows:
 *  - User info (email/name)
 *  - Profile
 *  - Dashboard shortcut
 *  - Countdown (session expiry)
 *  - Settings
 *  - Logout
 *
 * Props:
 *  - variant: "tourist" | "organizer" (affects styling)
 */
const ProfileDropdown = ({ variant = 'organizer' }) => {
  const { user, logout, countdown } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isTourist = variant === 'tourist';
  
  const profilePath = `/dashboard/${user?.role || 'tourist'}/profile`;
  // 🔹 Close dropdown if clicked outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // 🔹 Handle navigation to the dashboard dynamically
  const handleDashboardClick = () => {
    if (user?.role === 'organizer') navigate('/dashboard/organizer');
    else if (user?.role === 'admin') navigate('/dashboard/admin');
    else if (user?.role === 'guide') navigate('/dashboard/guide');
    else navigate('/dashboard/tourist');
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 🔹 Button to toggle dropdown */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-slate-700 text-gray-700 dark:text-white ${
          isTourist
            ? 'border-2 border-primary p-1 shadow-md'
            : 'bg-gray-800 p-2 text-white border-2 border-primary'
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <User className={isTourist ? 'w-6 h-6' : 'w-5 h-5'} />
        <span className={`hidden sm:inline ${isTourist ? '' : 'font-semibold'}`}>
          {user?.name || user?.email || 'User'}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 🔹 Dropdown Menu */}
      {open && (
        <div
          className={`absolute right-0 mt-2 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${
            isTourist ? 'bg-white hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white' : 'bg-gray-900 text-white'
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium truncate">
            {user?.email || 'User'}
          </div>

          {/* Profile */}
          <button
           onClick={() => navigate(profilePath)}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            role="menuitem"
          >
            <User className="w-4 h-4" />
            Profile
          </button>

          {/* Dashboard */}
          <button
            onClick={handleDashboardClick}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            role="menuitem"
          >
            <LayoutDashboardIcon className="w-4 h-4" />
            Dashboard
          </button>

          {/* Countdown */}
          {countdown && (
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
              ⏳ Session: {countdown}
            </div>
          )}

          {/* Settings */}
          <button
            onClick={() => alert('Settings clicked')}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            role="menuitem"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          {/* Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none"
            role="menuitem"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
