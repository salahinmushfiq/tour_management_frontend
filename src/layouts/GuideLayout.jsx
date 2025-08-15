// src/layouts/GuideLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { DashboardNavbar,DashboardSidebar } from '../pages/dashboard';

const GuideLayout = () => {
  const { user } = useAuth();
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DashboardSidebar role={user.role} collapsed={collapsed} onToggle={setCollapsed} />

      <div className="flex flex-col flex-1">
        <DashboardNavbar variant="guide" toggleSidebar={() => setCollapsed(prev => !prev)}/>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GuideLayout;
