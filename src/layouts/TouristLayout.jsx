import React from 'react';

import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '@emotion/react';
import { ThemeToggle, TooltipWrapper } from '../pages/dashboard';


const TouristDashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const { theme } = useTheme()
  console.log(user);
  return (
    <div className="bg-gray dark:bg-gray-900 text-gray-900 dark:text-white ">
      <Navbar className="bg-gray dark:bg-gray-900 text-black dark:text-white"/>
      <div className="h-[68px] bg-dark w-full"></div>
       {/* Top-right utilities bar */}
      <div className="absolute top-20 right-4 flex items-center gap-3">
        <TooltipWrapper label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} position="bottom">
          <ThemeToggle />
        </TooltipWrapper>
      </div>
      <main className="mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default TouristDashboardLayout;
