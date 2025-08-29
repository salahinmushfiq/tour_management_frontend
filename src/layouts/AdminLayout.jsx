// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { DashboardNavbar,DashboardSidebar } from '../pages/dashboard';

const AdminLayout = () => {
  const { user } = useAuth();
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <DashboardSidebar role={user.role} collapsed={collapsed} onToggle={setCollapsed} />
  
  <div className="flex flex-col flex-1 min-w-0">
    <DashboardNavbar variant={user.role} toggleSidebar={() => setCollapsed(prev => !prev)}/>
    <main className="flex-1 p-4 min-w-0 overflow-auto">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default AdminLayout;

