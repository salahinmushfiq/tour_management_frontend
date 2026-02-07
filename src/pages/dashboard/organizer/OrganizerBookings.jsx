// import React from 'react';

// const OrganizerBookings = () => {
//   return (
//     <div className="p-6 bg-white dark:bg-dark min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Bookings</h1>
//       <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
//         <p className="text-gray-600 dark:text-white">No bookings yet.</p>
//         {/* Future: booking table or cards will go here */}
//       </div>
//     </div>
//   );
// };

// src/pages/dashboard/organizer/OrganizerBookings.jsx
// src/pages/dashboard/organizer/OrganizerBookings.jsx
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../context/authAPI";
import { useAuth } from "../../../context/AuthContext";

const OrganizerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for tours organized by this user
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/bookings/?organizer=${user.id}`);
      console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add cash entry for partial bookings
  const cashCollect = async (bookingId, amount) => {
    try {
      if (!amount || parseFloat(amount) <= 0) return;
      await axiosInstance.patch(`/bookings/${bookingId}/cash-collect/`, {
        amount: parseFloat(amount),
      });
      fetchBookings();
    } catch (err) {
      console.error("Cash collection failed", err);
    }
  };

  // Verify fully paid manually
  const verifyPayment = async (bookingId) => {
    try {
      await axiosInstance.patch(`/bookings/${bookingId}/verify/`);
      fetchBookings();
    } catch (err) {
      console.error("Verification failed", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <p className="text-gray-600 dark:text-white">No bookings yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <table className="min-w-full table-auto border rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Tour</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Paid</th>
              <th className="px-4 py-2 text-left">Due</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Paid At</th>
              <th className="px-4 py-2 text-left">Last Method</th>
              <th className="px-4 py-2 text-left">Cash Entry</th>
              <th className="px-4 py-2 text-left">Verify</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => {
              const amountDue = b.amount - (b.amount_paid || 0);
              const canAddCash = amountDue > 0;
              const canVerify = b.payment_status === "partial";

              return (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-2">{b.participant_user.email}</td>
                  <td className="px-4 py-2">{b.tour.title}</td>
                  <td className="px-4 py-2">{b.amount}</td>
                  <td className="px-4 py-2">{b.amount_paid || 0}</td>
                  <td className="px-4 py-2">{amountDue}</td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                        b.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : b.payment_status === "partial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.payment_status}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    {b.latest_payment_time
                      ? new Date(b.latest_payment_time).toLocaleString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-2">
                    {b.latest_payment_method || "N/A"}
                  </td>

                  <td className="px-4 py-2">
                    {canAddCash ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="৳"
                          className="border px-2 py-1 text-xs rounded w-20 dark:text-white dark:bg-slate-700"
                          onChange={(e) => (b._cash = e.target.value)}
                        />
                        <button
                          onClick={() => cashCollect(b.id, b._cash)}
                          className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Add Cash
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {canVerify ? (
                      <button
                        onClick={() => verifyPayment(b.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                      >
                        Mark Full Paid
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerBookings;
