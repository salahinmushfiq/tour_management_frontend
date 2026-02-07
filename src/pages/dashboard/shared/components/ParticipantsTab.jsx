// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../../context/AuthContext";
// import axiosInstance from "../../../../api/axiosInstance";

// export default function ParticipantsTab({ tourId }) {
//   const { user } = useAuth();
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchParticipants = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/tours/${tourId}/`);
//       setParticipants(res.data.participants || []);
//     } catch (err) {
//       console.error("Failed to load participants", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (participantId, action) => {
//     try {
//       await axiosInstance.patch(`/tours/participants/${participantId}/${action}/`);
//       fetchParticipants();
//     } catch (err) {
//       console.error(`Failed to ${action} participant`, err);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [tourId]);

//   if (loading) {
//     return <div className="p-4 text-gray-500">Loading participants...</div>;
//   }

//   if (!participants.length) {
//     return <div className="p-4 text-gray-500">No participants yet.</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Participants</h2>

//       {/* Table for md+ screens */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="min-w-full border rounded-lg bg-gray-50 dark:bg-slate-700">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               {user?.role === "organizer" && <th className="px-4 py-2">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {participants.map((p) => (
//               <tr key={p.id} className="border-t">
//                 <td className="px-4 py-2">{p.email}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium capitalize ${
//                       p.status === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : p.status === "pending"
//                         ? "bg-yellow-100 text-yellow-500"
//                         : p.status === "rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {p.status}
//                   </span>
//                 </td>
//                 {user?.role === "organizer" && (
//                   <td className="px-4 py-2 space-x-2">
//                     {p.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(p.id, "approve")}
//                           className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(p.id, "reject")}
//                           className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Stacked cards for small screens */}
//       <div className="md:hidden flex flex-col gap-3">
//         {participants.map((p) => (
//           <div key={p.id} className="border rounded-lg p-4 bg-white dark:bg-gray-700">
//             <p className="font-semibold">{p.email}</p>
//             <p className="mt-1">
//               Status:{" "}
//               <span
//                 className={`px-2 py-1 rounded text-xs font-medium capitalize ${
//                   p.status === "approved"
//                     ? "bg-green-100 text-green-700"
//                     : p.status === "pending"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : p.status === "rejected"
//                     ? "bg-red-100 text-red-700"
//                     : "bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {p.status}
//               </span>
//             </p>
//             {user?.role === "organizer" && p.status === "pending" && (
//               <div className="mt-2 flex gap-2">
//                 <button
//                   onClick={() => updateStatus(p.id, "approve")}
//                   className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => updateStatus(p.id, "reject")}
//                   className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../../context/AuthContext";
// import axiosInstance from "../../../../api/axiosInstance";

// export default function ParticipantsTab({ tourId }) {
//   const { user } = useAuth();
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchParticipants = async () => {
//     try {
//       setLoading(true);

//       // ✅ Correct endpoint
//       const res = await axiosInstance.get(`/tours/${tourId}/`);

//       // ✅ Directly use response (participants list)
//       setParticipants(res.data.participants || []);
//     } catch (err) {
//       console.error("Failed to load participants", err);
//       setParticipants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (participantId, action) => {
//     try {
//       await axiosInstance.patch(
//         `/tours/participants/${participantId}/${action}/`
//       );
//       fetchParticipants();
//     } catch (err) {
//       console.error(`Failed to ${action} participant`, err);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [tourId]);

//   if (loading) {
//     return <div className="p-4 text-gray-500">Loading participants...</div>;
//   }

//   if (!participants.length) {
//     return <div className="p-4 text-gray-500">No participants yet.</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Participants</h2>

//       {/* ✅ Table view for desktop */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="min-w-full border rounded-lg bg-gray-50 dark:bg-slate-700">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               {user?.role === "organizer" && (
//                 <th className="px-4 py-2">Actions</th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
//             {participants.map((p) => (
//               <tr key={p.id} className="border-t">
//                 <td className="px-4 py-2">{p.email}</td>

//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium capitalize ${
//                       p.status === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : p.status === "pending"
//                         ? "bg-yellow-100 text-yellow-500"
//                         : p.status === "rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {p.status}
//                   </span>
//                 </td>

//                 {user?.role === "organizer" && (
//                   <td className="px-4 py-2 space-x-2">
//                     {p.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(p.id, "approve")}
//                           className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(p.id, "reject")}
//                           className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Card view for mobile */}
//       <div className="md:hidden flex flex-col gap-3">
//         {participants.map((p) => (
//           <div
//             key={p.id}
//             className="border rounded-lg p-4 bg-white dark:bg-gray-700"
//           >
//             <p className="font-semibold">{p.email}</p>

//             <p className="mt-1">
//               Status:{" "}
//               <span
//                 className={`px-2 py-1 rounded text-xs font-medium capitalize ${
//                   p.status === "approved"
//                     ? "bg-green-100 text-green-700"
//                     : p.status === "pending"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : p.status === "rejected"
//                     ? "bg-red-100 text-red-700"
//                     : "bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {p.status}
//               </span>
//             </p>

//             {user?.role === "organizer" && p.status === "pending" && (
//               <div className="mt-2 flex gap-2">
//                 <button
//                   onClick={() => updateStatus(p.id, "approve")}
//                   className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                 >
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => updateStatus(p.id, "reject")}
//                   className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axiosInstance from "../../../../api/axiosInstance";

export default function ParticipantsTab({ tourId }) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch participants (support old participants or new Booking model)
  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/tours/${tourId}/`);
      const participantsList = res.data.participants
        ? res.data.participants
        : res.data.bookings?.map((b) => ({
            id: b.participant.id,
            email: b.participant.user?.email || "Unknown",
            status: b.participant.status || "pending",
          })) || [];
      setParticipants(participantsList);
    } catch (err) {
      console.error("Failed to load participants", err);
      setParticipants([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (participantId, action) => {
    try {
      await axiosInstance.patch(`/tours/participants/${participantId}/${action}/`);
      fetchParticipants();
    } catch (err) {
      console.error(`Failed to ${action} participant`, err);
    }
  };

  const fetchBookings = async (participant) => {
    try {
      setBookingsLoading(true);
      const res = await axiosInstance.get(`/tours/bookings/?participant=${participant.id}`);
      console.log("res.data");
      console.log(res.data);
      setBookings(res.data);
      setSelectedParticipant(participant);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  const payBooking = async (bookingId) => {
    try {
      const amount = parseFloat(paymentAmount);
      if (!amount || amount <= 0) return alert("Enter a valid amount");
      await axiosInstance.patch(`/tours/bookings/${bookingId}/pay/`, { amount });
      setPaymentAmount("");
      fetchBookings(selectedParticipant);
    } catch (err) {
      console.error("Failed to pay booking", err);
    }
  };

  const verifyPayment = async (bookingId) => {
    try {
      await axiosInstance.patch(`/tours/bookings/${bookingId}/verify/`);
      fetchBookings(selectedParticipant);
    } catch (err) {
      console.error("Failed to verify payment", err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [tourId]);

  if (loading) return <div className="p-4 text-gray-500">Loading participants...</div>;
  if (!participants.length) return <div className="p-4 text-gray-500">No participants yet.</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Participants</h2>

      {/* Table for md+ */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border rounded-lg bg-gray-50 dark:bg-slate-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2 text-left">{p.email}</td>
                <td className="px-4 py-2 text-left">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      p.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : p.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {p.status === "pending" && user?.role === "organizer" && (
                    <>
                      <button
                        onClick={() => updateStatus(p.id, "approve")}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(p.id, "reject")}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => fetchBookings(p)}
                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    View Bookings
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small screens */}
      <div className="md:hidden flex flex-col gap-3">
        {participants.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 bg-white dark:bg-gray-700">
            <p className="font-semibold">{p.email}</p>
            <p className="mt-1">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                  p.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : p.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.status}
              </span>
            </p>
            <div className="mt-2 flex gap-2">
              {p.status === "pending" && user?.role === "organizer" && (
                <>
                  <button
                    onClick={() => updateStatus(p.id, "approve")}
                    className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(p.id, "reject")}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => fetchBookings(p)}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
              >
                View Bookings
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Modal */}
      {modalOpen && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-11/12 md:w-2/3 p-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              Bookings for {selectedParticipant.email}
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 dark:text-gray-200"
            >
              ✕
            </button>
            {bookingsLoading ? (
              <p>Loading bookings...</p>
            ) : !bookings.length ? (
              <p>No bookings yet.</p>
            ) : (
              <table className="min-w-full border rounded-lg bg-gray-50 dark:bg-slate-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Paid</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Paid At</th>
                    {user?.role === "organizer" || user?.role === "admin" ? (
                      <th className="px-4 py-2">Actions</th>
                    ) : (
                      <th className="px-4 py-2">Pay</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-t">
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
                      <td className="px-4 py-2">{formatDate(b.paid_at)}</td>
                      <td className="px-4 py-2">
                        {user?.role === "organizer" || user?.role === "admin" ? (
                          <button
                            onClick={() => verifyPayment(b.id)}
                            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                          >
                            Verify
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Amount"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              className="px-2 py-1 border rounded text-xs w-16"
                            />
                            <button
                              onClick={() => payBooking(b.id)}
                              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                            >
                              Pay
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
