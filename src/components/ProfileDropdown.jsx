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

// // export default ProfileDropdown;
// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { User, ChevronDown, Settings, LogOut, LayoutDashboardIcon } from 'lucide-react';
// import { useUIStore } from '../store/useUIStore';
// const ProfileDropdown = ({ variant = 'organizer' }) => {
//   const { user, logout, countdown } = useAuth();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const theme = useUIStore((state) => state.theme);

//   const isTourist = variant === 'tourist';
//   const profilePath = `/dashboard/${user?.role || 'tourist'}/profile`;

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const onClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', onClickOutside);
//     return () => document.removeEventListener('mousedown', onClickOutside);
//   }, []);

//   // Navigate dynamically to dashboard
//   const handleDashboardClick = () => {
//     switch (user?.role) {
//       case 'organizer': navigate('/dashboard/organizer'); break;
//       case 'admin': navigate('/dashboard/admin'); break;
//       case 'guide': navigate('/dashboard/guide'); break;
//       default: navigate('/dashboard/tourist'); break;
//     }
//   };

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       {/* Toggle button */}
//       <button
//         onClick={() => setOpen(prev => !prev)}
//         className={`flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//           isTourist
//             ? 'border-2 border-primary p-1 shadow-md bg-white text-gray-700 dark:bg-slate-700 dark:text-white'
//             : 'bg-gray-800 p-2 text-white border-2 border-primary'
//         }`}
//         aria-haspopup="true"
//         aria-expanded={open}
//       >
//         <User className={isTourist ? 'w-6 h-6' : 'w-5 h-5'} />
//         <span className={`hidden sm:inline ${isTourist ? '' : 'font-semibold'}`}>
//           {user?.name || user?.email || 'User'}
//         </span>
//         <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div
//           className={`absolute right-0 mt-2 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${
//             isTourist
//               ? 'bg-white hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
//               : 'bg-gray-900 text-white'
//           }`}
//           role="menu"
//           aria-orientation="vertical"
//         >
//           {/* Header */}
//           <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium truncate">
//             {user?.email || 'User'}
//           </div>

//           {/* Profile */}
//           <button
//             onClick={() => navigate(profilePath)}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//             role="menuitem"
//           >
//             <User className="w-4 h-4" />
//             Profile
//           </button>

//           {/* Dashboard */}
//           <button
//             onClick={handleDashboardClick}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//             role="menuitem"
//           >
//             <LayoutDashboardIcon className="w-4 h-4" />
//             Dashboard
//           </button>

//           {/* Countdown */}
//           {countdown !== null && (
//             <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
//               ⏳ Session: {countdown}s
//             </div>
//           )}

//           {/* Settings */}
//           <button
//             onClick={() => alert('Settings clicked')}
//             className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//             role="menuitem"
//           >
//             <Settings className="w-4 h-4" />
//             Settings
//           </button>

//           {/* Logout */}
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

// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { User, ChevronDown, Settings, LogOut, LayoutDashboardIcon, ShieldCheck } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ProfileDropdown = ({ variant = 'organizer' }) => {
//   const { user, logout, countdown } = useAuth();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const isTourist = variant === 'tourist';
//   const profilePath = `/dashboard/${user?.role || 'tourist'}/profile`;

//   useEffect(() => {
//     const onClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener('mousedown', onClickOutside);
//     return () => document.removeEventListener('mousedown', onClickOutside);
//   }, []);

//   const handleDashboardClick = () => {
//     navigate(`/dashboard/${user?.role || 'tourist'}`);
//     setOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       {/* Trigger: Cleaner, more integrated look */}
//       <button
//         onClick={() => setOpen(prev => !prev)}
//         className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 focus:outline-none"
//         aria-expanded={open}
//       >
//         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-white shadow-sm">
//           <User size={18} />
//         </div>
        
//         <div className="hidden md:flex flex-col items-start leading-tight">
//           <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
//             {user?.name?.split(' ')[0] || 'User'}
//           </span>
//           <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
//             {user?.role}
//           </span>
//         </div>
        
//         <ChevronDown 
//           className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
//         />
//       </button>

//       {/* Dropdown Menu with Framer Motion */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden z-[100]"
//           >
//             {/* User Info Header */}
//             <div className="px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
//               <p className="text-xs text-gray-400 font-medium mb-1">Signed in as</p>
//               <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
//                 {user?.email}
//               </p>
//             </div>

//             <div className="p-1.5">
//               {/* Menu Items */}
//               {[
//                 { label: 'Profile', icon: User, action: () => navigate(profilePath) },
//                 { label: 'Dashboard', icon: LayoutDashboardIcon, action: handleDashboardClick },
//                 { label: 'Settings', icon: Settings, action: () => {} },
//               ].map((item, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => { item.action(); setOpen(false); }}
//                   className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
//                 >
//                   <item.icon size={16} className="text-gray-400 group-hover:text-blue-500" />
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {/* Countdown / Session */}
//             {countdown !== null && (
//               <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-b border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between mb-1">
//                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
//                     Session Security
//                   </span>
//                   <div className={`w-2 h-2 rounded-full ${countdown <= 30 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className={`text-lg font-mono font-black tabular-nums ${
//                     countdown <= 30 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
//                   }`}>
//                     {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
//                   </span>
//                   <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-none">
//                     remaining
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Logout Section */}
//             <div className="p-1.5 border-t border-gray-100 dark:border-gray-700">
//               <button
//                 onClick={logout}
//                 className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
//               >
//                 <LogOut size={16} className="text-red-400 group-hover:text-red-600" />
//                 <span className="font-semibold">Sign Out</span>
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProfileDropdown;


//src/components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, ChevronDown, Settings, LogOut, LayoutDashboardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDropdown = () => {
  const { user, logout, countdown } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // --- NAME EXTRACTION LOGIC ---
  // Priorities: 1. user.name -> 2. Cleaned Email Prefix -> 3. "User"
  const displayName = user?.name || (user?.email ? 
    user.email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase()) 
    : 'User');

  const userInitial = displayName.charAt(0).toUpperCase();
  const profilePath = `/dashboard/${user?.role || 'tourist'}/profile`;

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Navbar Trigger */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-white shadow-sm font-bold text-xs uppercase">
          {userInitial}
        </div>
        
        <div className="hidden md:flex flex-col items-start leading-tight text-left">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate max-w-[100px]">
            {displayName}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            {user?.role || 'User'}
          </span>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden z-[100]"
          >
            <div className="px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 font-medium mb-1">Signed in as</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                {user?.email}
              </p>
            </div>

            <div className="p-1.5">
              <button 
                onClick={() => { navigate(profilePath); setOpen(false); }} 
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <User size={16} className="text-gray-400 group-hover:text-blue-500" /> 
                Profile
              </button>
              
              <button 
                onClick={() => { navigate(`/dashboard/${user?.role || 'tourist'}`); setOpen(false); }} 
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <LayoutDashboardIcon size={16} className="text-gray-400 group-hover:text-blue-500" /> 
                Dashboard
              </button>
              
              <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
                <Settings size={16} className="text-gray-400 group-hover:text-blue-500" /> 
                Settings
              </button>
            </div>

            {/* Session Monitor */}
            {countdown !== null && (
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-gray-700 font-mono">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Session Security</span>
                <span className={`text-lg font-black ${countdown <= 30 ? "text-red-500" : "text-emerald-500"}`}>
                  {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                </span>
              </div>
            )}

            <div className="p-1.5 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={logout} 
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group font-semibold"
              >
                <LogOut size={16} /> 
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;