

// src/pages/dashboard/components/TourCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../context/authAPI";
import { motion } from "framer-motion";
import { Camera, Star, MessageCircle } from "lucide-react";

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
      await axiosInstance.post("/tours/participants/", { tour: tour.id });
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
    if (tour.status === "approved")
      return (
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
          Accepted
        </span>
      );
    if (tour.status === "pending")
      return (
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-600">
          Pending
        </span>
      );
    if (tour.status === "completed")
      return (
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
          Completed
        </span>
      );
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow hover:shadow-md transition bg-white dark:bg-gray-700
        ${layout === "compact" ? "flex items-center p-3 gap-3" : ""}
        ${layout === "list" ? "flex flex-col md:flex-row gap-4 p-4" : ""}
        ${layout === "grid" ? "p-5" : ""}`}
    >
      {/* Image */}
      {(layout === "grid" || layout === "list" || layout === "compact") && (
        <img
          src={tour.cover_image || "https://via.placeholder.com/400x200"}
          alt={tour.title}
          className={`rounded-lg object-cover
            ${layout === "grid" ? "w-full h-40 mb-4" : ""}
            ${layout === "list" ? "w-full md:w-48 md:h-32 flex-shrink-0 mb-4 md:mb-0" : ""}
            ${layout === "compact" ? "w-20 h-20 flex-shrink-0" : ""}`}
        />
      )}

      {/* Info */}
      <div className={`${layout === "compact" ? "flex-1 flex flex-col justify-between" : ""}`}>
        <div>
          <h3 className={`${layout === "compact" ? "text-sm font-semibold" : "text-lg font-bold"}`}>
            {tour.title}
          </h3>
          <p className={`${layout === "compact" ? "text-xs text-gray-500" : "text-sm text-gray-600 dark:text-gray-300"}`}>
            {new Date(tour.start_date).toLocaleDateString()} - {new Date(tour.end_date).toLocaleDateString()}
          </p>

          {layout === "list" && (
            <>
              <p className="mt-1 text-sm">{tour.start_location} → {tour.end_location}</p>
              <p className="mt-1 text-sm">Organizer: {tour.organizer_email}</p>
              <p className="mt-1 text-sm">Participants: {tour.participants?.length}</p>
              <p className="mt-1 text-sm">Category: {tour.category}</p>
              <p className="mt-2 text-sm line-clamp-3">{tour.description}</p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className={`flex flex-wrap items-center gap-2 mt-2 ${layout === "compact" ? "" : ""}`}>
          {statusBadge()}

          {layout !== "compact" && !tour.status && (
            <button
              onClick={handleRequestJoin}
              className={`px-3 py-1 rounded-xl text-white transition bg-green-600 hover:bg-green-700
                ${layout === "grid" ? "w-full" : ""}`}
            >
              Request to Join
            </button>
          )}

          {layout !== "compact" && showDetailButton && (
            <button
              onClick={handleViewDetails}
              className={`px-3 py-1 rounded-xl text-white transition bg-indigo-600 hover:bg-indigo-700
                ${layout === "grid" ? "w-full" : ""}`}
            >
              View Details
            </button>
          )}

          {layout === "compact" && (
            <button
              onClick={tour.status ? handleViewDetails : handleRequestJoin}
              className="px-2 py-1 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {tour.status ? "Details" : "Join"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
