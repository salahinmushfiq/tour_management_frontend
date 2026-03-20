// src/pages/dashboard/tourist/TouristHome.jsx
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axiosInstance";
import { useUIStore } from "../../../store/useUIStore";
import { LayoutGrid, List, Maximize2, ChevronDown, Compass, Map } from "lucide-react"; // Icons for a 'toury' facelift
import {TourCard} from "../../../components";

export default function TouristHome() {
  const { user } = useAuth();
  const showSnackbar = useUIStore((state) => state.showSnackbar);

  const [loading, setLoading] = useState(true);
  const [toursData, setToursData] = useState({
    available: [],
    pending: [],
    active: [],
    past: [],
  });

  const [sections, setSections] = useState({
    available: true,
    pending: true,
    active: true,
    past: true,
  });

  const [layout, setLayout] = useState(
    localStorage.getItem("tourLayout") || "compact"
  );

  useEffect(() => {
    localStorage.setItem("tourLayout", layout);
  }, [layout]);

  const fetchTours = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data } = await api.get("/tours/my-tours/");
      setToursData({
        available: data.available_tours || [],
        pending: data.pending_tours || [],
        active: data.active_tours || [],
        past: data.past_tours || [],
      });
    } catch (err) {
      console.error("Error fetching tours:", err?.response || err);
      showSnackbar("Failed to fetch tours", "error");
    } finally {
      setLoading(false);
    }
  }, [user, showSnackbar]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleRequestJoin = async (tourId) => {
    try {
      await api.post("/tours/participants/", { tour: tourId });
      fetchTours();
      showSnackbar("Request sent successfully!", "success");
    } catch (err) {
      console.error("Error requesting to join tour:", err);
      showSnackbar("Failed to request join", "error");
    }
  };

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sectionClass =
    layout === "grid"
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-2"
      : layout === "list"
      ? "flex flex-col gap-4 pt-2"
      : "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-2";

  const renderTourCard = (tour) => (
    <MemoTourCard
      key={tour.id}
      tour={tour}
      showDetailButton={tour.status === "approved" || tour.status === "completed"}
      onRequestJoin={() => handleRequestJoin(tour.id)}
      layout={layout}
    />
  );

  const sectionsData = [
    { key: "available", label: "Available Tours", icon: <Compass size={18} /> },
    { key: "pending", label: "Pending Requests", icon: <Map size={18} /> },
    { key: "active", label: "Ongoing Adventures", icon: <Zap size={18} className="text-amber-500" /> },
    { key: "past", label: "Travel Memories", icon: <Sparkles size={18} className="text-purple-500" /> },
  ];

  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 dark:bg-white/5 h-64 rounded-[2rem] border border-gray-100 dark:border-white/5" />
  );

  return (
    <div className="px-6 md:px-16 min-h-screen py-8 bg-slate-50 dark:bg-transparent">
      {/* --- FACELIFT: Hero Section --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-slate-900 text-white rounded-[2.5rem] p-10 mb-10 shadow-2xl border border-white/10"
      >
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
          <Compass size={180} />
        </div>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
            Traveler Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">{user?.first_name || "Traveler"}</span> 👋
          </h1>
          <p className="text-lg text-slate-400 max-w-xl font-medium">
            Your next adventure is just a click away. Explore new horizons or manage your current journeys.
          </p>
        </div>
      </motion.div>

      {/* --- FACELIFT: Layout Toggle (Segmented Control) --- */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">View Preferences</h2>
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10">
          {[
            { id: "grid", icon: <LayoutGrid size={16} /> },
            { id: "list", icon: <List size={16} /> },
            { id: "compact", icon: <Maximize2 size={16} /> }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setLayout(l.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                layout === l.id
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {l.icon}
              <span className="hidden sm:inline capitalize">{l.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- FACELIFT: Sections --- */}
      {sectionsData.map((sec) => (
        <div key={sec.key} className="mb-10">
          <button
            onClick={() => toggleSection(sec.key)}
            className="group w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-3xl transition-all border border-slate-200 dark:border-white/5 mb-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                {sec.icon}
              </div>
              <span className="font-black text-sm uppercase tracking-widest text-slate-800 dark:text-slate-200">{sec.label}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500">
                {toursData[sec.key]?.length || 0}
              </span>
            </div>
            <motion.div
              animate={{ rotate: sections[sec.key] ? 180 : 0 }}
              className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {sections[sec.key] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={sectionClass}
              >
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                ) : toursData[sec.key] && toursData[sec.key].length > 0 ? (
                  toursData[sec.key].map(renderTourCard)
                ) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white/50 dark:bg-white/5 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-white/10">
                    <p className="text-slate-400 text-sm font-medium tracking-tight">
                      No {sec.label.toLowerCase()} found in your records.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const MemoTourCard = React.memo(TourCard);
const Zap = ({ size, className }) => <Compass size={size} className={className} />; // Fallback icon
const Sparkles = ({ size, className }) => <Compass size={size} className={className} />; // Fallback icon