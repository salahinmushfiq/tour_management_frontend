import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const OrganizerHome = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-6 min-h-screen bg-white dark:bg-dark">      
      {/* <h1 className="text-2xl font-bold mb-6">Organizer Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Upcoming Tours</h2>
          <p className="text-gray-600">0 planned</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-gray-600">0 bookings</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-gray-600">$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerHome;
