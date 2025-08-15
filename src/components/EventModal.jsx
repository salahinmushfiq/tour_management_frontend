import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventModal({ event, onClose }) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-8 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-lg max-w-lg w-full relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <button
              className="absolute top-2 right-3 text-white text-3xl"
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>
            {event.cover_image && (
              <img
                src={event.cover_image}
                alt={event.title}
                className="rounded mb-4 w-full h-52 object-cover"
              />
            )}
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-300 mb-1">Location: {event.start_location}</p>
            <p className="text-sm text-gray-300 mb-1">Date: {new Date(event.start_date).toDateString()}</p>
            <p className="text-sm text-gray-300 mb-1">Category: {event.category}</p>
            <p className="text-sm text-green-400 mb-1">
              BDT {event.cost_per_person} | Max participants: {event.max_participants}
            </p>
            <p className="text-sm text-white mb-2">{event.description}</p>
            {event.offers && event.offers.length > 0 && (
              <>
                <h4 className="font-semibold text-lg mt-4 text-yellow-400">Offers:</h4>
                <ul className="list-disc ml-5 text-sm text-gray-300 space-y-1">
                  {event.offers.map((offer, i) => (
                    <li key={i}>
                      <span className="font-medium text-white">{offer.title}</span>: {offer.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
