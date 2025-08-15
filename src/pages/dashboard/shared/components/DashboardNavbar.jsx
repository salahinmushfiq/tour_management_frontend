import React from 'react';
import { Menu } from 'lucide-react';
// import TooltipWrapper from './TooltipWrapper';
// import ThemeToggle from './ThemeToggle';
import {TooltipWrapper,ThemeToggle,ProfileDropdown} from "../../"
import { useTheme } from '../../../../hooks/useTheme';


const DashboardNavbar = ({ variant = 'default', toggleSidebar, collapsed }) => {
  const { theme } = useTheme();

  const displayName = variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <header className="flex items-center justify-between px-4 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      <button
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="text-gray-700 dark:text-gray-300 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Menu/>
      </button>

      <div className="text-lg font-semibold select-none">
        {variant === 'default' ? 'Dashboard' : `${displayName} Dashboard`}
      </div>

      <div className="flex items-center gap-3">
        <TooltipWrapper label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} position="bottom">
          <ThemeToggle />
        </TooltipWrapper>
        <ProfileDropdown variant={variant} />
      </div>
    </header>
  );
};

export default DashboardNavbar;
