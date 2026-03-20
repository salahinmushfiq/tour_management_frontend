// src/pages/dashboard/components/TourCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight, Compass } from "lucide-react";
import api from "../../api/axiosInstance";

export default function TourCard({
  tour,
  showDetailButton = false,
  layout = "compact",
  onRequestJoin,
  onDetail,
}) {
  const navigate = useNavigate();

  const handleRequestJoin = async () => {
    if (onRequestJoin) return onRequestJoin();
    try {
      await api.post("/tours/participants/", { tour: tour.id });
      // You might want to use your global snackbar here instead of alert
      alert("Request sent!");
    } catch (err) {
      console.error("Error requesting to join tour:", err);
    }
  };

  const handleViewDetails = () => {
    if (onDetail) return onDetail(tour.id);
    navigate(`events/${tour.id}`);
  };

  const statusBadge = () => {
    const base = "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ";
    if (tour.status === "approved")
      return <span className={`${base} bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400`}>Accepted</span>;
    if (tour.status === "pending")
      return <span className={`${base} bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400`}>In Review</span>;
    if (tour.status === "completed")
      return <span className={`${base} bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400`}>Finished</span>;
    return null;
  };

  // Shared Styles for the FaceLift
  const cardStyle = `
    group relative overflow-hidden transition-all duration-300
    bg-white dark:bg-slate-900 
    border border-slate-200 dark:border-white/5
    hover:border-blue-500/50 dark:hover:border-blue-400/50
    ${layout === "compact" ? "flex items-center p-4 gap-4 rounded-3xl" : ""}
    ${layout === "list" ? "flex flex-col md:flex-row gap-6 p-6 rounded-[2.5rem]" : ""}
    ${layout === "grid" ? "flex flex-col p-0 rounded-[2.5rem]" : ""}
  `;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cardStyle}
    >
      {/* Visual Indicator for Grid Mode Header */}
      {layout === "grid" && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={tour.cover_image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
             <span className="bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-white/20">
               {tour.category || "Adventure"}
             </span>
          </div>
        </div>
      )}

      {/* Image for Compact & List */}
      {(layout === "list" || layout === "compact") && (
        <div className="relative flex-shrink-0">
          <img
            src={tour.cover_image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
            alt={tour.title}
            className={`object-cover rounded-2xl
              ${layout === "list" ? "w-full md:w-56 h-40" : "w-16 h-16"}
            `}
          />
          {layout === "compact" && (
             <div className="absolute inset-0 bg-blue-500/10 rounded-2xl group-hover:bg-transparent transition-colors" />
          )}
        </div>
      )}

      {/* Content Area */}
      <div className={`flex-1 ${layout === "grid" ? "p-6" : "flex flex-col justify-center"}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-black tracking-tight text-slate-900 dark:text-white
            ${layout === "compact" ? "text-sm" : "text-xl"}
          `}>
            {tour.title}
          </h3>
          {layout === "compact" && statusBadge()}
        </div>

        {/* Dynamic Detail Sections */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Calendar size={14} className="text-blue-500" />
            <span className="text-[11px] font-bold tracking-tight">
              {new Date(tour.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(tour.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {layout !== "compact" && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-white/5 mt-3">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <MapPin size={14} className="text-rose-500" />
                <span className="text-xs font-semibold">{tour.start_location} <ArrowRight size={10} className="inline mx-1"/> {tour.end_location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Users size={14} className="text-indigo-500" />
                <span className="text-xs font-semibold">{tour.participants?.length || 0} Travelers Registered</span>
              </div>
              {layout === "list" && (
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 italic leading-relaxed">
                  "{tour.description}"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`flex items-center gap-3 ${layout === "grid" ? "mt-6" : "mt-4"}`}>
          {layout !== "compact" && statusBadge()}

          {(!tour.status) && (
            <button
              onClick={handleRequestJoin}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30
                ${layout === "grid" ? "w-full" : ""}
              `}
            >
              <Compass size={14} /> Book Adventure
            </button>
          )}

          {showDetailButton && (
            <button
              onClick={handleViewDetails}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105
                ${layout === "grid" ? "w-full" : ""}
              `}
            >
              Itinerary
            </button>
          )}

          {layout === "compact" && !tour.status && (
            <button
              onClick={handleRequestJoin}
              className="ml-auto p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
      
      {/* Hover Decoration (Enthusiastic Vibe) */}
      <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
         <Compass size={100} className="text-slate-900 dark:text-white" />
      </div>
    </motion.div>
  );
}