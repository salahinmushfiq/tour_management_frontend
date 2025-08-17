// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // Dummy events
// const allEvents = [
//   {
//     id: 1,
//     title: "Cox’s Bazar Beach Trek",
//     location: "Cox’s Bazar",
//     date: new Date("2025-07-20"),
//     category: "Adventure",
//     budget: "BDT 3500",
//     people: 24,
//     image: "https://images.pexels.com/photos/25288251/pexels-photo-25288251.jpeg",
//     shortDescription: "Explore the world's longest sea beach with expert guides.",
//     fullDescription: "Full trip details here...",
//   },
//   {
//     id: 2,
//     title: "Heritage Walk in Old Dhaka",
//     location: "Dhaka",
//     date: new Date("2025-07-23"),
//     category: "Heritage",
//     budget: "BDT 2000",
//     people: 18,
//     image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
//     shortDescription: "Walk through the alleys of Old Dhaka with food and culture.",
//     fullDescription: "Full trip details here...",
//   },
//   {
//     id: 3,
//     title: "Sundarban Eco Tour",
//     location: "Khulna",
//     date: new Date("2025-07-25"),
//     category: "Eco",
//     budget: "BDT 4500",
//     people: 32,
//     image: "https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg",
//     shortDescription: "A 3-day boat tour inside the mangrove forest.",
//     fullDescription: "Full trip details here...",
//   },
//   // Add more events if needed
// ];

// const categories = ["Adventure", "Heritage", "Eco"];

// export default function EventDiscoverySection() {
//   const [search, setSearch] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(4);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const toggleCategory = (cat) =>
//     setSelectedCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );

//   const clearFilters = () => {
//     setSearch("");
//     setSelectedCategories([]);
//     setStartDate(null);
//     setEndDate(null);
//   };

//   const filteredEvents = allEvents.filter((event) => {
//     const matchSearch =
//       event.title.toLowerCase().includes(search.toLowerCase()) ||
//       event.location.toLowerCase().includes(search.toLowerCase());

//     const matchCategory =
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(event.category);

//     const matchDate =
//       (!startDate || event.date >= startDate) &&
//       (!endDate || event.date <= endDate);

//     return matchSearch && matchCategory && matchDate;
//   });

//   const visibleEvents = filteredEvents.slice(0, visibleCount);

//   return (
//     <section className="bg-gray-900 text-white py-20">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10">Find Your Tour</h2>

//         {/* Filters */}
//         <div className="bg-white/5 backdrop-blur p-6 rounded-lg mb-10 space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <input
//               type="text"
//               placeholder="Search by title or location"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
//             />

//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               placeholderText="Start Date"
//               className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full md:w-40"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               placeholderText="End Date"
//               className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-full md:w-40"
//             />
//           </div>

//           {/* Category Chips */}
//           <div className="flex flex-wrap gap-3">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => toggleCategory(cat)}
//                 className={`px-3 py-1 rounded-full border ${
//                   selectedCategories.includes(cat)
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-700 text-gray-200"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//             {(search || selectedCategories.length || startDate || endDate) && (
//               <button
//                 onClick={clearFilters}
//                 className="ml-auto text-sm text-red-400 underline"
//               >
//                 Clear All Filters
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Event Cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {visibleEvents.map((event) => (
//             <motion.div
//               key={event.id}
//               whileHover={{ scale: 1.02 }}
//               className="bg-white/10 rounded-lg overflow-hidden shadow-lg cursor-pointer"
//               onClick={() => setSelectedEvent(event)}
//             >
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="h-40 w-full object-cover hidden md:flex"
//               />
//               <div className="p-4 space-y-1">
//                 <h3 className="font-semibold text-lg">{event.title}</h3>
//                 <p className="text-sm text-gray-300">{event.location}</p>
//                 <p className="text-sm text-gray-400">
//                   {event.date.toDateString()}
//                 </p>
//                 <span className="text-xs bg-indigo-600 px-2 py-1 rounded-full inline-block mt-2">
//                   {event.category}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Load More */}
//         {visibleCount < filteredEvents.length && (
//           <div className="text-center mt-8">
//             <button
//               onClick={() => setVisibleCount((c) => c + 4)}
//               className="px-6 py-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition"
//             >
//               Load More
//             </button>
//           </div>
//         )}

//         {/* Modal */}
//         <AnimatePresence>
//           {selectedEvent && (
//             <motion.div
//               className="fixed inset-0 bg-black/80 flex z-50 px-4 overflow-y-auto py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <motion.div
//                 className="bg-white text-black rounded-xl max-w-xl w-full p-6 relative overflow-hidden"
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: 50, opacity: 0 }}
//               >
//                 <button
//                   className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black"
//                   onClick={() => setSelectedEvent(null)}
//                 >
//                   ✕
//                 </button>
//                 <img
//                   src={selectedEvent.image}
//                   alt={selectedEvent.title}
//                   className="w-full h-56 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {selectedEvent.date.toDateString()} – {selectedEvent.location}
//                 </p>
//                 <p className="mb-4 text-gray-800">{selectedEvent.fullDescription}</p>
//                 <div className="flex flex-wrap text-sm text-gray-700 gap-4">
//                   <span>💵 {selectedEvent.budget}</span>
//                   <span>👥 {selectedEvent.people} joined</span>
//                   <span>🏷️ {selectedEvent.category}</span>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// components/EventSection.jsx
// components/EventSection.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

import Chip from "./EventCategoryChip";
import SkeletonCard from "./EventSkeletonCard";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

export default function EventSection() {
  const [allEvents, setAllEvents] = useState([]); // master list for selects
  const [displayEvents, setDisplayEvents] = useState([]); // paginated display
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL;

  // Fetch events page-wise from backend
  const fetchEvents = async (pageNum = 1) => {
    try {
      setLoading(true);
      const params = { page: pageNum, page_size: pageSize };
      if (category) params.category = category;
      if (location) params.start_location = location;
      if (search) params.search = search;

      const res = await axios.get(`${API_BASE}/tours/`, { params });
      const data = res.data;
      const results = Array.isArray(data.results) ? data.results : [];

      // Append new events for pagination
      setDisplayEvents((prev) => (pageNum === 1 ? results : [...prev, ...results]));
      setHasMore(Boolean(data.next));

      // Keep a master copy for selects (only update on first load)
      if (pageNum === 1 && allEvents.length === 0) {
        setAllEvents(results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchEvents(1);
  }, [category, location, search]);

  const loadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchEvents(nextPage);
  };

  // Always derive selects from master allEvents
  const categories = useMemo(
    () => [...new Set(allEvents.map((e) => e.category))].filter(Boolean),
    [allEvents]
  );
  const locations = useMemo(
    () => [...new Set(allEvents.map((e) => e.start_location))].filter(Boolean),
    [allEvents]
  );

  // Client-side filtering for date ranges
  const filteredEvents = useMemo(() => {
    return displayEvents.filter((event) => {
      const eventDate = new Date(event.start_date);
      const matchesStartDate = startDate ? eventDate >= startDate : true;
      const matchesEndDate = endDate ? eventDate <= endDate : true;
      return matchesStartDate && matchesEndDate;
    });
  }, [displayEvents, startDate, endDate]);

  const clearFilter = (filterName) => {
    switch (filterName) {
      case "category":
        setCategory("");
        break;
      case "location":
        setLocation("");
        break;
      case "search":
        setSearch("");
        break;
      case "startDate":
        setStartDate(null);
        break;
      case "endDate":
        setEndDate(null);
        break;
      default:
        break;
    }
    setPage(1);
    fetchEvents(1);
  };

  const clearAllFilters = () => {
    setCategory("");
    setLocation("");
    setSearch("");
    setStartDate(null);
    setEndDate(null);
    setPage(1);
    fetchEvents(1);
  };

  const anyFilterActive = search || category || location || startDate || endDate;

  return (
    <section className="bg-gray-900 text-white px-4 pb-20 relative z-10 pt-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Tour Events</h2>
          <p className="text-lg text-gray-300">Discover amazing experiences curated by top organizers.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <input
            type="search"
            placeholder="Search by title or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-64"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-48"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-48"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Start Date"
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-36"
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText="End Date"
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-36"
          />
        </div>

        {/* Selected filters chips */}
        {anyFilterActive && (
          <div className="flex flex-wrap justify-center mb-6">
            {search && <Chip label={`Search: ${search}`} onRemove={() => clearFilter("search")} />}
            {category && <Chip label={`Category: ${category}`} onRemove={() => clearFilter("category")} />}
            {location && <Chip label={`Location: ${location}`} onRemove={() => clearFilter("location")} />}
            {startDate && <Chip label={`Start: ${startDate.toDateString()}`} onRemove={() => clearFilter("startDate")} />}
            {endDate && <Chip label={`End: ${endDate.toDateString()}`} onRemove={() => clearFilter("endDate")} />}
            <button
              onClick={clearAllFilters}
              className="ml-4 px-3 py-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Event Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[24rem]">
          {loading
            ? Array.from({ length: pageSize }).map((_, i) => <SkeletonCard key={i} />)
            : filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                </motion.div>
              ))}
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-brand rounded-full text-white hover:bg-brand-dark transition"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </section>
  );
}

