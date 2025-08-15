import React from 'react';

const OrganizerBookings = () => {
  return (
    <div className="p-6 bg-white dark:bg-dark min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <p className="text-gray-600 dark:text-white">No bookings yet.</p>
        {/* Future: booking table or cards will go here */}
      </div>
    </div>
  );
};

export default OrganizerBookings;
