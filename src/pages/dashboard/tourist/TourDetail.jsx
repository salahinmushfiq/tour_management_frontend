// // src/pages/dashboard/tourist/TourDetail.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { axiosInstance } from "../../../context/authAPI";
// import { useAuth } from "../../../context/AuthContext";
// import { motion } from "framer-motion";

// export default function TourDetail() {
//   const { user } = useAuth();
//   const { id } = useParams();

//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("overview");

//   const [chatMessages, setChatMessages] = useState([]);
//   const [chatInput, setChatInput] = useState("");
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");

//   const [bookings, setBookings] = useState([]);
//   const [bookingsLoading, setBookingsLoading] = useState(false);

//   // Fetch tour details & chat messages
//   const fetchTour = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosInstance.get(`/tours/${id}/`);
//       setTour(data);

//       const chatRes = await axiosInstance.get(`/tours/${id}/chat/`);
//       setChatMessages(chatRes.data);
//     } catch (err) {
//       console.error("Error fetching tour details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTour();
//   }, [id]);

//   const sendMessage = async () => {
//     if (!chatInput) return;
//     await axiosInstance.post(`/tours/${id}/chat/`, { message: chatInput });
//     setChatInput("");
//     const chatRes = await axiosInstance.get(`/tours/${id}/chat/`);
//     setChatMessages(chatRes.data);
//   };

//   const submitRating = async () => {
//     if (!rating) return;
//     await axiosInstance.post(`/tours/${id}/rate/`, { rating, review });
//     alert("Rating submitted!");
//     setRating(0);
//     setReview("");
//   };

//   if (loading || !tour) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-lg text-gray-500">Loading tour details...</p>
//       </div>
//     );
//   }

//   const isPastTour = new Date(tour.end_date) < new Date();

//   return (
//     <div className="px-4 md:px-12 min-h-screen">
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-6"
//       >
//         <img
//           src={tour.cover_image || "https://via.placeholder.com/600x300"}
//           alt={tour.title}
//           className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-xl"
//         />
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
//             {tour.title} 
//             {tour.status && (
//               <span
//                 className={`px-2 py-1 rounded-full text-sm ${
//                   tour.status === "approved"
//                     ? "bg-green-100 text-green-700"
//                     : tour.status === "pending"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : tour.status === "completed"
//                     ? "bg-gray-200 text-gray-700"
//                     : "bg-gray-100 text-gray-500"
//                 }`}
//               >
//                 {tour.status}
//               </span>
//             )}
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//             {tour.start_date} → {tour.end_date} | {tour.start_location} → {tour.end_location}
//           </p>
//           <p className="text-sm mb-1">Organizer: {tour.organizer_email}</p>
//           <p className="text-sm mb-1">Participants: {tour.participants.length}</p>
//           <p className="text-sm mb-1">Category: {tour.category}</p>
//           <p className="mt-2">{tour.description}</p>
//         </div>
//       </motion.div>

//       {/* Tabs */}
//       <div className="flex gap-2 overflow-x-auto mb-6">
//         {["overview", "chat", "media", isPastTour ? "rate" : null]
//           .filter(Boolean)
//           .map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
//                 activeTab === tab
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//       </div>

//       {/* Tab Content */}
//       <div className="space-y-6">
//         {/* Overview */}
//         {activeTab === "overview" && (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold mb-2">Guides</h2>
//             {tour.guides.length ? (
//               <ul className="list-disc pl-5">
//                 {tour.guides.map((guide) => (
//                   <li key={guide.id}>{guide.user_email}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No guides assigned yet.</p>
//             )}

//             <h2 className="text-xl font-semibold mt-4 mb-2">Offers</h2>
//             {tour.offers.length ? (
//               <ul className="list-disc pl-5">
//                 {tour.offers.map((offer) => (
//                   <li key={offer.id}>
//                     {offer.title} - {offer.discount_percent}% valid until {offer.valid_until}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No offers available.</p>
//             )}
//           </div>
//         )}

//         {/* Chat */}
//         {activeTab === "chat" && (
//           <div className="flex flex-col h-80 border rounded p-2">
//             <div className="flex-1 overflow-y-auto mb-2 space-y-1">
//               {chatMessages.length ? (
//                 chatMessages.map((msg) => (
//                   <div key={msg.id} className="p-1 rounded">
//                     <strong>{msg.sender_email}:</strong> {msg.message}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm">No messages yet.</p>
//               )}
//             </div>
//             <div className="flex gap-2 mt-auto">
//               <input
//                 value={chatInput}
//                 onChange={(e) => setChatInput(e.target.value)}
//                 placeholder="Type a message..."
//                 className="flex-1 border rounded px-2 py-1"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="bg-indigo-600 px-4 py-2 text-white rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Media */}
//         {activeTab === "media" && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {tour.media && tour.media.length ? (
//               tour.media.map((item, idx) => (
//                 <img
//                   key={idx}
//                   src={item.url}
//                   alt={`Media ${idx + 1}`}
//                   className="w-full h-40 object-cover rounded-xl"
//                 />
//               ))
//             ) : (
//               <p className="text-gray-500">No media available.</p>
//             )}
//           </div>
//         )}

//         {/* Rate & Review */}
//         {activeTab === "rate" && isPastTour && (
//           <div className="space-y-2">
//             <h3 className="font-semibold text-lg">Rate & Review</h3>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min="1"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="border px-2 py-1 rounded w-20"
//               />
//               <span className="text-gray-500">/ 5</span>
//             </div>
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Write a review"
//               className="border px-2 py-1 rounded w-full"
//             />
//             <button
//               onClick={submitRating}
//               className="bg-green-600 px-4 py-2 text-white rounded"
//             >
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// src/pages/dashboard/tourist/TourDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../context/authAPI";
import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";

export default function TourDetail() {
  const { user } = useAuth();
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [modalBooking, setModalBooking] = useState(null);

  // Fetch tour & chat
  const fetchTour = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/tours/${id}/`);
      setTour(data);

      const chatRes = await axiosInstance.get(`/tours/${id}/chat/`);
      setChatMessages(chatRes.data);
    } catch (err) {
      console.error("Error fetching tour:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tourist's bookings
  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const res = await axiosInstance.get(
        `/bookings/?participant_user=${user.id}&tour=${id}`
      );
      console.log("fetch booking");
      console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
    fetchBookings();
  }, [id]);

  // Chat
  const sendMessage = async () => {
    if (!chatInput) return;
    await axiosInstance.post(`/tours/${id}/chat/`, { message: chatInput });
    setChatInput("");
    fetchTour(); // Refresh chat
  };

  // Rating
  const submitRating = async () => {
    if (!rating) return;
    await axiosInstance.post(`/tours/${id}/rate/`, { rating, review });
    alert("Rating submitted!");
    setRating(0);
    setReview("");
  };

  // Manual payment
  const payBooking = async (bookingId) => {
    try {
      const amount = parseFloat(paymentAmount);
      if (!amount || amount <= 0) return alert("Enter a valid amount");

      await axiosInstance.patch(`/bookings/${bookingId}/pay/`, { amount });
      setPaymentAmount("");
      fetchBookings();
    } catch (err) {
      console.error("Failed to pay booking", err);
    }
  };

  // Optional: SSLCOMMERZ payment
  const initiatePayment = async (bookingId) => {
    try {
      const payAmount = parseFloat(paymentAmount);
    if (!payAmount || payAmount <= 0) return alert("Enter a valid amount");

    const res = await axiosInstance.post("/payments/initiate/", {
      booking: bookingId,
      amount: payAmount,
      method: "sslcommerz",
    });

    const gatewayUrl = res.data.gateway?.GatewayPageURL;
    console.log(res);
    console.log(res.data);
    if (gatewayUrl) {
      window.location.href = gatewayUrl;  // Redirect to SSLCOMMERZ
      // Open payment gateway in new tab
    //   const gatewayUrl = res.data.gateway?.GatewayPageURL;
    // if (gatewayUrl) {
    //   window.location.href = gatewayUrl;  // redirect to SSLCOMMERZ
    } else {
      console.error("No gateway URL returned:", res.data.gateway);
      alert("Payment initiation failed.");
    }
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert(err.response?.data?.detail || "Payment initiation failed");
    }
  };

  if (loading || !tour) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-500">Loading tour details...</p>
      </div>
    );
  }

  const isPastTour = new Date(tour.end_date) < new Date();

  return (
    <div className="px-4 md:px-12 min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-6"
      >
        <img
          src={tour.cover_image || "https://via.placeholder.com/600x300"}
          alt={tour.title}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-xl"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            {tour.title}
            {tour.status && (
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  tour.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : tour.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : tour.status === "completed"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tour.status}
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {tour.start_date} → {tour.end_date} | {tour.start_location} → {tour.end_location}
          </p>
          <p className="text-sm mb-1">Organizer: {tour.organizer_email}</p>
          <p className="text-sm mb-1">Participants: {tour.participants.length}</p>
          <p className="text-sm mb-1">Category: {tour.category}</p>
          <p className="mt-2">{tour.description}</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {["overview", "chat", "media", "bookings", isPastTour ? "rate" : null]
          .filter(Boolean)
          .map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Guides</h2>
            {tour.guides.length ? (
              <ul className="list-disc pl-5">
                {tour.guides.map((guide) => (
                  <li key={guide.id}>{guide.user_email}</li>
                ))}
              </ul>
            ) : (
              <p>No guides assigned yet.</p>
            )}

            <h2 className="text-xl font-semibold mt-4 mb-2">Offers</h2>
            {tour.offers.length ? (
              <ul className="list-disc pl-5">
                {tour.offers.map((offer) => (
                  <li key={offer.id}>
                    {offer.title} - {offer.discount_percent}% valid until {offer.valid_until}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No offers available.</p>
            )}
          </div>
        )}

        {/* Chat */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-80 border rounded p-2">
            <div className="flex-1 overflow-y-auto mb-2 space-y-1">
              {chatMessages.length ? (
                chatMessages.map((msg) => (
                  <div key={msg.id} className="p-1 rounded">
                    <strong>{msg.sender_email}:</strong> {msg.message}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No messages yet.</p>
              )}
            </div>
            <div className="flex gap-2 mt-auto">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded px-2 py-1"
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 px-4 py-2 text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Media */}
        {activeTab === "media" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tour.media && tour.media.length ? (
              tour.media.map((item, idx) => (
                <img
                  key={idx}
                  src={item.url}
                  alt={`Media ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-xl"
                />
              ))
            ) : (
              <p className="text-gray-500">No media available.</p>
            )}
          </div>
        )}

        {/* Bookings */}
{activeTab === "bookings" && (
  <div className="space-y-4 overflow-x-auto">
    {bookingsLoading ? (
      <p>Loading bookings...</p>
    ) : !bookings.length ? (
      <p>No bookings yet.</p>
    ) : (
      <table className="min-w-full table-auto border rounded-lg bg-gray-50 dark:bg-slate-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Paid</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Paid At</th>
            {bookings.some(b => b.payment_status !== "paid") && (
              <th className="px-4 py-2 text-left">Pay</th>
            )}
          </tr>
        </thead>
        {/* <tbody>
          {bookings.map((b) => {
            const remaining = b.amount - (b.amount_paid || 0);
            const isPaid = b.payment_status === "paid";

            return (
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
                  {b.payment_status === "partial" && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({remaining} remaining)
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <p>{b.created_at}</p>
                  {b.paid_at ? new Date(b.created_at).toLocaleString() : "N/A"}
                </td>

                {!isPaid && (
                  <td className="px-4 py-2">
                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                      <input
                        type="number"
                        placeholder={remaining}
                        value={paymentAmount}
                        min="0"
                        max={remaining}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="px-2 py-1 border rounded text-xs w-16 dark:text-white dark:bg-slate-700"
                      />
                      <button
                        onClick={() => payBooking(b.id)}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Pay Partial
                      </button>
                      <button
                        onClick={() => initiatePayment(b.id, remaining)}
                        className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                      >
                        Pay Online
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody> */}
      <tbody>
  {bookings.map((b) => {
    const remaining = b.amount - (b.amount_paid || 0);
    const isPaid = b.payment_status === "paid";

    // Get last successful payment date
    const lastPayment = b.payments
      ? b.payments
          .filter(p => p.status.toLowerCase() === "success")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
      : null;

    return (
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
          {b.payment_status === "partial" && (
            <span className="ml-2 text-xs text-gray-500">
              ({remaining} remaining)
            </span>
          )}
        </td>
        <td className="px-4 py-2">
          {lastPayment
            ? new Date(lastPayment.created_at).toLocaleString()
            : "N/A"}
        </td>

        {isPaid && (
          <td className="px-4 py-2">
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <input
                type="number"
                placeholder={remaining}
                value={paymentAmount}
                min="0"
                max={remaining}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="px-2 py-1 border rounded text-xs w-16 dark:text-white dark:bg-slate-700"
              />
              <button
                onClick={() => payBooking(b.id)}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Pay Partial
              </button>
              <button
                onClick={() => initiatePayment(b.id, remaining)}
                className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
              >
                Pay Online
              </button>
            </div>
          </td>
        )}
      </tr>
    );
  })}
</tbody>

      </table>
    )}
  </div>
)}



        {/* Rate & Review */}
        {activeTab === "rate" && isPastTour && (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Rate & Review</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border px-2 py-1 rounded w-20 dark:text-white"
              />
              <span className="text-gray-500">/ 5</span>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write a review"
              className="border px-2 py-1 rounded w-full"
            />
            <button
              onClick={submitRating}
              className="bg-green-600 px-4 py-2 text-white rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
