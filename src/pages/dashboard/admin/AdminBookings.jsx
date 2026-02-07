// export default AdminBookings;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../context/authAPI";
import { useAuth } from "../../../context/AuthContext";

const AdminBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      // ✅ Admin should ALWAYS get ALL bookings
      const res = await axiosInstance.get("/bookings/");
      console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (bookingId) => {
    try {
      await axiosInstance.patch(`/bookings/${bookingId}/verify/`);
      fetchBookings();
    } catch (err) {
      console.error("Failed to verify payment", err);
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
      <div className="p-6 bg-white dark:bg-dark min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <p className="text-gray-600 dark:text-white">No bookings yet.</p>
        </div>
      </div>
    );
  }

  const showPayColumn = bookings.some((b) => b.payment_status !== "paid");

  return (
    <div className="p-6 bg-white dark:bg-dark min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <table className="min-w-full table-auto border rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Organizer</th>
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Paid</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Paid At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2">{b.participant_user.email}</td>
                <td className="px-4 py-2">{b.tour.organizer_email}</td>
                <td className="px-4 py-2">{b.tour.title}</td>
                <td className="px-4 py-2">{b.amount}</td>
                <td className="px-4 py-2">{b.amount_paid || 0}</td>

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
                  {b.paid_at ? new Date(b.paid_at).toLocaleString() : "N/A"}
                </td>

                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center">

                    {/* ✅ Admin cash verification */}
                    {b.payment_status !== "paid" && (
                      <button
                        onClick={() => verifyPayment(b.id)}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Verify Cash
                      </button>
                    )}

                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
