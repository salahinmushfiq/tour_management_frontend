import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';
import TooltipWrapper from './TooltipWrapper';
import ProfileDropdown from './ProfileDropdown';
import { useTheme } from '../../../../../hooks/useTheme';

const OrganizerDashboardNavbar = () => {
  const { theme } = useTheme();
  const { setCollapsed } = useSidebar();

  return (
    <header className="flex items-center justify-between px-4 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      
      {/* Sidebar toggle for mobile */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="lg:hidden text-gray-700 dark:text-gray-300"
      >
        <Menu />
      </button>

      <div className="text-lg font-semibold">
        Dashboard
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle with tooltip */}
        <TooltipWrapper label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} position="bottom">
          <ThemeToggle />
        </TooltipWrapper>

        {/* Logout with tooltip */}
        {/* <TooltipWrapper label="Logout" position="bottom">
          <button
            onClick={logout}
            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </TooltipWrapper> */}
        <ProfileDropdown variant="organizer" />

      </div>
    </header>
  );
};

export default OrganizerDashboardNavbar; 