import React from "react";
import { motion } from "framer-motion";

export default function EventCard({ event, onClick }) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {event.cover_image ? (
        <img
          src={event.cover_image}
          alt={event.title}
          className="h-40 w-full object-cover hidden md:block"
          onError={(e) => (e.currentTarget.src = "https://source.unsplash.com/800x600/?travel")}
        />
      ) : (
        <div className="h-40 w-full bg-gray-700 hidden md:block" />
      )}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <p className="text-sm text-gray-300">{event.start_location}</p>
        <p className="text-sm text-gray-400">{new Date(event.start_date).toDateString()}</p>
        <span className="text-xs bg-brand px-2 py-1 rounded-full inline-block mt-1">{event.category}</span>
        <div className="text-sm text-green-400 mt-1">
          BDT {event.cost_per_person} | Max {event.max_participants} people
        </div>
      </div>
    </motion.div>
  );
}
