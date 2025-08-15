import React from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import ProfileDropdown from './ProfileDropdown';

const GuideDashboardNavbar = ({ toggleSidebar }) => {
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-700 dark:text-gray-300"
        aria-label="Toggle sidebar"
      >
        <Menu />
      </button>

      <div className="text-lg font-semibold">Guide Dashboard</div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Profile dropdown, specify variant 'guide' if needed */}
        <ProfileDropdown variant="guide" />
      </div>
    </header>
  );
};

export default GuideDashboardNavbar;
