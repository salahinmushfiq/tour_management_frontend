// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardNavbar,DashboardSidebar } from '../components';
import { useUIStore } from '../store/useUIStore';

const AdminLayout = () => {
  const { user } = useAuth();
  const isCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  if (!user) return null; 

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DashboardSidebar role={user.role} collapsed={isCollapsed} onToggle={toggleSidebar} />
  
      <div className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar variant={user.role} toggleSidebar={toggleSidebar} collapsed={isCollapsed}/>
        <main className="flex-1 p-4 min-w-0 overflow-auto">
          <Outlet />
        </main>
      </div>
</div>

  );
};

export default AdminLayout;

