//dashboard/shared/components/TourCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TourDetailCard({ tour, showDetailButton = false }) {
  const navigate = useNavigate();
  const isPastTour = new Date(tour.end_date) < new Date();

  const handleDetailClick = () => {
    navigate(`/dashboard/tourist/tours/${tour.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl shadow hover:shadow-lg transition p-4 bg-white dark:bg-gray-700 flex flex-col"
    >
      <img
        src={tour.cover_image || "https://via.placeholder.com/400x200"}
        alt={tour.title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-bold">{tour.title}</h3>
      <p className="text-sm text-gray-600">
        {new Date(tour.start_date).toLocaleDateString()} -{" "}
        {new Date(tour.end_date).toLocaleDateString()}
      </p>
      <p className="text-sm">{tour.start_location}</p>

      {tour.status === "approved" && (
        <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
          Accepted
        </span>
      )}
      {tour.status === "pending" && (
        <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">
          Pending Approval
        </span>
      )}
      {tour.status === "completed" && (
        <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
          Completed
        </span>
      )}

      {showDetailButton && (
        <button
          onClick={handleDetailClick}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
        >
          {isPastTour ? "View & Rate" : "View Details"}
        </button>
      )}
    </motion.div>
  );
}