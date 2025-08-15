import React from 'react';

import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const TouristDashboardLayout = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="bg-gray dark:bg-gray-900 text-gray-900 dark:text-white ">
      <Navbar />
      <main className="mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default TouristDashboardLayout;
