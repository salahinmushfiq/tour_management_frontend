import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Menu } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const AdminDashboardSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const links = [
    { to: '/dashboard/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/dashboard/admin/tours', label: 'Tours', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } h-screen bg-white dark:bg-gray-800 border-r transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-center text-xl font-bold text-gray-800 dark:text-white">
        {collapsed ? '🏔️' : 'Admin'}
      </div>
      <nav className="flex-1 px-2 py-4">
        {links.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${
              location.pathname === to
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboardSidebar;
