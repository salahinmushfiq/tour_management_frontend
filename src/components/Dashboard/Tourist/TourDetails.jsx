// src/pages/dashboard/tourist/TourDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../api/axiosInstance";
import { 
  Info, MessageCircle, Image as ImageIcon, CreditCard, 
  Star, MapPin, Calendar, Users, Briefcase, Send, ChevronRight 
} from "lucide-react";

export default function TourDetails() {
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
  const [paymentAmounts, setPaymentAmounts] = useState({});


  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const fetchTour = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/tours/${id}/`);
      setTour(data);
    } catch (err) {
      console.error("Error fetching tour:", err);
    } finally {
      setLoading(false);
    }
  };

const fetchBookings = async () => {
  try {
    setBookingsLoading(true);
    const res = await api.get(`/bookings/?participant_user=${user.id}&tour=${id}`);
    setBookings(res.data.results || []); // <- Use results array
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

  const sendMessage = async () => {
    if (!chatInput) return;
    await api.post(`/tours/${id}/chat/`, { message: chatInput });
    setChatInput("");
    fetchTour(); 
  };

  const submitRating = async () => {
    if (!rating) return;
    await api.post(`/tours/${id}/rate/`, { rating, review });
    alert("Rating submitted!");
    setRating(0);
    setReview("");
  };

  const payBooking = async (bookingId, amountStr) => {
    try {
      const amount = parseFloat(amountStr);

      if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
      }

      const res = await api.patch(`/bookings/${bookingId}/pay/`, { amount });

      const updatedBooking = res.data;

      setBookings(prev =>
        prev.map(b => (b.id === bookingId ? updatedBooking : b))
      );

      setPaymentAmounts(prev => ({ ...prev, [bookingId]: "" }));

    } catch (err) {
      console.error("Failed to pay booking", err);
      alert(err.response?.data?.detail || "Payment failed");
    }
  };

const initiatePayment = async (bookingId, amountStr) => {
  try {
    const amount = parseFloat(amountStr);

    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const res = await api.post("/payments/initiate/", {
      booking: bookingId,
      amount,
      method: "sslcommerz",
    });

    const gatewayUrl = res.data?.gateway?.GatewayPageURL;

    if (gatewayUrl) {
      window.location.href = gatewayUrl;
    } else {
      alert("Payment gateway unavailable");
    }

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.detail || "Payment initiation failed");
  }
};

  if (loading || !tour) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
          <Compass size={40} className="text-blue-500" />
        </motion.div>
        <p className="mt-4 text-slate-500 font-black uppercase tracking-widest text-xs">Mapping your journey...</p>
      </div>
    );
  }

  const isPastTour = new Date(tour.end_date) < new Date();

  const tabList = [
    { id: "overview", label: "Overview", icon: <Info size={18}/> },
    { id: "chat", label: "Group Chat", icon: <MessageCircle size={18}/> },
    { id: "media", label: "Media", icon: <ImageIcon size={18}/> },
    { id: "bookings", label: "Payments", icon: <CreditCard size={18}/> },
    ...(isPastTour ? [{ id: "rate", label: "Review", icon: <Star size={18}/> }] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Cinematic Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={tour.cover_image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"} 
          className="w-full h-full object-cover scale-105"
          alt="Tour Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest">
                {tour.category || "Adventure"}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-4 tracking-tighter">
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-slate-300 font-medium text-sm">
                <span className="flex items-center gap-2"><MapPin size={16} className="text-blue-400"/> {tour.start_location}</span>
                <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-400"/> {tour.start_date}</span>
                <span className="flex items-center gap-2"><Users size={16} className="text-blue-400"/> {tour.participants.length} Joined</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Tabs Navigation */}
            <div className="bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-xl border border-slate-200 dark:border-white/5 flex gap-1 mb-8 overflow-x-auto no-scrollbar">
              {tabList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panes */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-white/5 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400">
                        <Briefcase size={18}/> About this Tour
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                        "{tour.description}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-white/5">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Your Expert Guides</h4>
                        <div className="space-y-3">
                          {tour.guides.map(g => (
                            <div key={g.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/5">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold uppercase">
                                {g.user_email[0]}
                              </div>
                              <span className="text-sm font-semibold">{g.user_email}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Active Offers</h4>
                        {tour.offers.map(o => (
                          <div key={o.id} className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
                            <p className="font-bold text-amber-800 dark:text-amber-400 text-sm">{o.title}</p>
                            <p className="text-xs text-amber-700/70">{o.discount_percent}% off • Ends {o.valid_until}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "chat" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[500px]">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                      {chatMessages.length ? chatMessages.map((msg) => (
                        <div key={msg.id} className={`max-w-[80%] p-4 rounded-2xl ${msg.sender_email === user.email ? 'ml-auto bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5'}`}>
                          <p className="text-[10px] font-black uppercase tracking-tighter opacity-50 mb-1">{msg.sender_email}</p>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      )) : <p className="text-center text-slate-400 mt-20 italic">No messages yet. Start the conversation!</p>}
                    </div>
                    <div className="mt-6 flex gap-3 p-2 bg-slate-50 dark:bg-white/5 rounded-2xl">
                      <input 
                        value={chatInput} 
                        onChange={e => setChatInput(e.target.value)}
                        className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm"
                        placeholder="Share something with the group..."
                      />
                      <button onClick={sendMessage} className="p-3 bg-slate-900 text-white rounded-xl hover:scale-105 transition-transform">
                        <Send size={18}/>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "bookings" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

                    {bookings.length === 0 ? (
                      <p className="text-center text-slate-400 italic mt-20">
                        You have no bookings for this tour yet.
                      </p>
                    ) : (
                      bookings.map((b) => {
                        const remaining = parseFloat(b.amount) - parseFloat(b.amount_paid || 0);

                        return (
                          <div
                            key={b.id}
                            className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-transparent"
                          >
                            {/* Booking Header */}
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                                  Total Booking Amount
                                </p>
                                <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                                  ${b.amount}
                                </h4>
                              </div>
                              <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  {
                                    paid: "bg-emerald-100 text-emerald-600",
                                    partial: "bg-amber-100 text-amber-600",
                                    pending: "bg-slate-200 text-slate-600",
                                  }[b.payment_status]
                                }`}
                              >
                                {b.payment_status}
                              </span>
                            </div>

                            {/* Payment Input + Buttons (if remaining) */}
                            {remaining > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Amount Input */}
                                <div className="relative">
                                  <span className="absolute left-4 top-1/3 -translate-y-1/2 text-slate-400 font-bold">
                                    $
                                  </span>
                                  <input
                                    className="bg-gray-700 text-white"
                                    type="number"
                                    min="1"
                                    max={remaining}
                                    step="0.01"
                                    value={paymentAmounts[b.id] || ""}
                                    onChange={(e) =>
                                      setPaymentAmounts((prev) => ({
                                        ...prev,
                                        [b.id]: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                  {/* Partial / Cash Payment */}
                                  <button
                                    onClick={() =>
                                      payBooking(b.id, paymentAmounts[b.id])
                                    }
                                    className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
                                  >
                                    Pay / Partial
                                  </button>

                                  {/* Online Payment */}
                                  <button
                                    onClick={() =>
                                      initiatePayment(b.id, paymentAmounts[b.id])
                                    }
                                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                                  >
                                    Pay Online
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Display Payments History */}
                            {b.payments && b.payments.length > 0 && (
                              <div className="mt-6 space-y-2">
                                <h5 className="text-sm font-black uppercase text-slate-400 tracking-wider mb-2">
                                  Payments History
                                </h5>
                                {b.payments.map((p) => (
                                  <div
                                    key={p.id}
                                    className="flex justify-between items-center p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-sm"
                                  >
                                    <span>
                                      {p.method.toUpperCase()} - ${p.amount}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {new Date(p.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20">
                <h4 className="font-black uppercase tracking-[0.2em] text-[10px] opacity-70 mb-6">Organizer Info</h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Users size={20}/>
                  </div>
                  <div>
                    <p className="text-xs opacity-70 uppercase font-black">Admin Contact</p>
                    <p className="font-bold text-sm truncate">{tour.organizer_email}</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                  Message Organizer
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5">
                <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400 mb-6">Journey Roadmap</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="w-0.5 h-full bg-slate-100 dark:bg-white/5 my-1" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tighter text-slate-400">Departure</p>
                      <p className="text-sm font-bold">{tour.start_location}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tighter text-slate-400">Final Destination</p>
                      <p className="text-sm font-bold">{tour.end_location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const Compass = ({ size, className }) => <MapPin size={size} className={className} />;
const Sparkles = ({ size, className }) => <Star size={size} className={className} />;