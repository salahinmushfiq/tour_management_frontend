
const TouristHome = () => {
  return (
    <div className="py-6 min-h-screen gap-y-24 -mt-28">
      {/* <h1 className="text-2xl font-bold mb-6">{user.email}</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button> */}
      <div className="h-16 bg-dark"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Upcoming Tours</h2>
          <p className="text-gray-600">0 planned</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-gray-600">0 bookings</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-gray-600">$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default TouristHome;