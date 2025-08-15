// import { Link, useLocation } from 'react-router-dom';
// import { Home, ClipboardList, User } from 'lucide-react';

// const navConfig = {
//   admin: [
//     { to: '/dashboard/admin', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/admin/tours', label: 'Tours', icon: <ClipboardList size={20} /> },
//   ],
//   organizer: [
//     { to: '/dashboard/organizer', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/organizer/bookings', label: 'Bookings', icon: <ClipboardList size={20} /> },
//     { to: '/dashboard/organizer/tours', label: 'Tours', icon: <ClipboardList size={20} /> },
//     { to: '/dashboard/organizer/tours/create', label: 'Add Tours', icon: <ClipboardList size={20} /> },
//   ],
//   guide: [
//     { to: '/dashboard/guide', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/guide/assignments', label: 'Assignments', icon: <ClipboardList size={20} /> },
//     { to: '/dashboard/guide/profile', label: 'Profile', icon: <User size={20} /> },
//     { to: '/dashboard/guide/tours', label: 'Tours', icon: <ClipboardList size={20} /> },
//   ],
//   tourist: [
//     { to: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
//     // add tourist links here if needed
//   ],
// };

// const roleIcons = {
//   admin: '🏔️',
//   organizer: '🏔️',
//   guide: '🧭',
//   tourist: '👤',
// };

// const Sidebar = ({ role, collapsed, onToggle }) => {
//   const location = useLocation();
//   const links = navConfig[role] || [];

//   return (
//     <div
//       className={`${
//         collapsed ? 'w-20' : 'w-64'
//       } h-screen bg-white dark:bg-gray-800 border-r transition-all duration-300 flex flex-col`}
//     >
//       <div className="h-16 flex items-center justify-center text-xl font-bold text-gray-800 dark:text-white select-none cursor-default">
//         {collapsed ? roleIcons[role] || '❓' : role.charAt(0).toUpperCase() + role.slice(1)}
//       </div>
//       <nav className="flex-1 px-2 py-4">
//         {links.map(({ to, label, icon }) => (
//           <Link
//             key={to}
//             to={to}
//             onClick={onToggle ? () => onToggle(false) : undefined}
//             className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${
//               location.pathname === to
//                 ? 'bg-blue-500 text-white'
//                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//             }`}
//           >
//             {icon}
//             {!collapsed && <span>{label}</span>}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



// import { Link, useLocation } from 'react-router-dom';
// import {
//   Home,
//   ClipboardList,
//   User,
//   UserCheck,
//   Calendar,
//   Users,
//   PlusCircle,
//   MapPin,
//   BookOpen,
// } from 'lucide-react';

// const navConfig = {
//   admin: [
//     { to: '/dashboard/admin', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/admin/tours', label: 'Manage Tours', icon: <ClipboardList size={20} /> },
//     { to: '/dashboard/admin/bookings', label: 'Manage Bookings', icon: <BookOpen size={20} /> },
//     { to: '/dashboard/admin/guides', label: 'Manage Guides', icon: <UserCheck size={20} /> },
//   ],
//   organizer: [
//     { to: '/dashboard/organizer', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/organizer/bookings', label: 'Bookings', icon: <ClipboardList size={20} /> },
//     { to: '/dashboard/organizer/tours', label: 'Tours', icon: <MapPin size={20} /> },
//     { to: '/dashboard/organizer/tours/create', label: 'Add New Tour', icon: <PlusCircle size={20} /> },
//     { to: '/dashboard/organizer/guides', label: 'Guides', icon: <User size={20} /> },
//   ],
//   guide: [
//     { to: '/dashboard/guide', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/guide/assignments', label: 'Assignments', icon: <ClipboardList size={20} /> },
//     { to: '/dashboard/guide/profile', label: 'My Profile', icon: <User size={20} /> },
//     { to: '/dashboard/guide/tours', label: 'Tours', icon: <MapPin size={20} /> },
//     { to: '/dashboard/guide/schedule', label: 'Schedule', icon: <Calendar size={20} /> },
//   ],
//   tourist: [
//     { to: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
//     { to: '/dashboard/bookings', label: 'My Bookings', icon: <BookOpen size={20} /> },
//     { to: '/dashboard/tours', label: 'Available Tours', icon: <MapPin size={20} /> },
//     { to: '/dashboard/profile', label: 'Profile', icon: <User size={20} /> },
//   ],
// };

// const roleIcons = {
//   admin: '🏔️',
//   organizer: '🏔️',
//   guide: '🧭',
//   tourist: '👤',
// };

// const Sidebar = ({ role, collapsed, onToggle }) => {
//   const location = useLocation();
//   const links = navConfig[role] || [];

//   return (
//     <div
//       className={`${
//         collapsed ? 'w-20' : 'w-64'
//       } h-screen bg-white dark:bg-gray-800 border-r transition-all duration-300 flex flex-col`}
//     >
//       <div className="h-16 flex items-center justify-center text-xl font-bold text-gray-800 dark:text-white select-none cursor-default">
//         {collapsed ? roleIcons[role] || '❓' : role.charAt(0).toUpperCase() + role.slice(1)}
//       </div>
//       <nav className="flex-1 px-2 py-4">
//         {links.map(({ to, label, icon }) => (
//           <Link
//             key={to}
//             to={to}
//             onClick={onToggle ? () => onToggle(false) : undefined}
//             className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${
//               location.pathname === to
//                 ? 'bg-blue-500 text-white'
//                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//             }`}
//           >
//             {icon}
//             {!collapsed && <span>{label}</span>}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ListCheck,
  User,
  Calendar,
  PlusSquare,
  Users,
  ShieldCheck, ClipboardList, MapPin,
} from 'lucide-react';

const navConfig = {
  admin: [
    { to: '/dashboard/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/dashboard/admin/tours', label: 'Tours', icon: <ListCheck size={20} /> },
    { to: '/dashboard/admin/users', label: 'Users', icon: <Users size={20} /> },
  ],
  organizer: [
    { to: '/dashboard/organizer', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/dashboard/organizer/tours', label: 'My Tours', icon: <ListCheck size={20} /> },
    { to: '/dashboard/organizer/tours/create', label: 'Create Tour', icon: <PlusSquare size={20} /> },
  ],
  guide: [
    { to: '/dashboard/guide', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/dashboard/guide/assignments', label: 'Assignments', icon: <ListCheck size={20} /> },
    { to: '/dashboard/guide/profile', label: 'Profile', icon: <User size={20} /> },
    { to: '/dashboard/guide/tours', label: 'Available Tours', icon: <Calendar size={20} /> },
  ],
};

const roleIcons = {
  admin: <ShieldCheck  size={28} strokeWidth={1.5} />,
  organizer: <ClipboardList  size={28} strokeWidth={1.5} />,
  guide: <MapPin  size={28} strokeWidth={1.5} />,
  tourist: <User size={28} strokeWidth={1.5} />,
};
const DashboardSidebar = ({ role, collapsed, onToggle }) => {
  const location = useLocation();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const links = navConfig[role] || [];

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLargeScreen && collapsed) {
    return null; // Hide sidebar on small screen when collapsed
  }

  return (
    <aside
      className={`top-0 left-0 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 z-50
        ${
          !isLargeScreen
            ? (collapsed ? 'w-0' : 'w-20')    // small screen: hide or icon-only
            : (collapsed ? 'w-20' : 'w-64')   // large screen: icon-only or full
        }
      `}
      aria-label={`${role} sidebar navigation`}
    >
      <div className="h-16 flex items-center justify-center text-gray-900 dark:text-white select-none cursor-default">
        <span role="img" aria-label={`${role} icon`} className="text-3xl">
          {roleIcons[role] || '❓'}
        </span>
      </div>

      <nav className="flex-1 px-2 py-4" aria-label="Main navigation">
        {links.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onToggle ? () => {
                if (!isLargeScreen) onToggle(true); // hide sidebar on small screen after click
              } : undefined}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {icon}
              {(!collapsed && isLargeScreen) && <span className="font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};


export default DashboardSidebar;
