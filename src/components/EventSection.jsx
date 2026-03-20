//src/components/EventSection.jsx

import React, { useState, useMemo, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Chip from "./EventCategoryChip";
import SkeletonCard from "./EventSkeletonCard";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

import { useEvents } from "../hooks/useEvents"; 

/* ---------------------- Compass Loader Component ---------------------- */
export function CompassLoader() {
  return (
    <div className="relative flex items-center justify-center w-6 h-6">
      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
      <div className="absolute inset-0 border border-white/40 rounded-full" />
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "circIn",
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[8px] border-b-red-500" />
          <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-t-[8px] border-t-white" />
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------- Main Event Section ---------------------- */
export default function EventSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      category: category || undefined,
      location: location || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    }),
    [debouncedSearch, category, location, startDate, endDate]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading,isError } = useEvents(filters);
  const events = data?.pages.flatMap((page) => page.results) || [];

  const categories = useMemo(() => [...new Set(events.map((e) => e.category))].filter(Boolean), [events]);
  const locations = useMemo(() => [...new Set(events.map((e) => e.start_location))].filter(Boolean), [events]);

  /* --- Journey Sync Logic --- */
    
  useEffect(() => {
    const id = setTimeout(() => {
      // Tell GSAP the page height changed so the trail doesn't end early
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(id);
  }, [events.length]);
  
  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const clearFilter = useCallback((filterName) => {
    const setters = {
      search: setSearch,
      category: setCategory,
      location: setLocation,
      startDate: setStartDate,
      endDate: setEndDate
    };

    setters[filterName]?.(filterName.includes("Date") ? null : "");
  }, []);

  const clearAllFilters = () => {
    setSearch(""); setCategory(""); setLocation(""); setStartDate(null); setEndDate(null);
  };

  const anyFilterActive = search || category || location || startDate || endDate;

  return (
    <section id="events" className=" text-white px-4 pb-20 pt-12 w-full relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Events</h2>
          <p className="text-lg text-gray-400 ">The journey of a thousand miles begins with a single step."</p>
        </motion.div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <input
            type="search"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            /* RESTORED: bg-gray-800/90 and border-gray-600 */
            className="px-4 py-2 rounded-lg bg-gray-800/90 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400 shadow-xl"
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800/90 text-white border border-gray-600 outline-none cursor-pointer hover:bg-gray-700 transition shadow-xl"
          >
            <option value="" className="bg-gray-900">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800/90 text-white border border-gray-600 outline-none cursor-pointer hover:bg-gray-700 transition shadow-xl"
          >
            <option value="" className="bg-gray-900">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-gray-900">
                {loc.includes(" (") ? loc.split(" (")[0] : loc}
              </option>
            ))}
          </select>

          {/* For DatePicker, ensure you wrap it or pass the className correctly */}
          <div className="relative custom-datepicker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="From Date"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/90 text-white border border-gray-600 outline-none shadow-xl"
            />
          </div>

          <div className="relative custom-datepicker">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="To Date"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/90 text-white border border-gray-600 outline-none shadow-xl"
            />
          </div>
        </div>

        {/* Filter Chips */}
        {/* Filter Chips */}
        <AnimatePresence>
          {anyFilterActive && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 mb-8 overflow-hidden"
            >
              {search && <Chip label={`"${search}"`} onRemove={() => clearFilter("search")} />}
              {category && <Chip label={category} onRemove={() => clearFilter("category")} />}
              
              {/* UPDATED: Clean location name for the Chip */}
              {location && (
                <Chip 
                  label={location.includes(" (") ? location.split(" (")[0] : location} 
                  onRemove={() => clearFilter("location")} 
                />
              )}

              {startDate && <Chip label={`Starts: ${startDate.toLocaleDateString()}`} onRemove={() => clearFilter("startDate")} />}
              
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-red-400 hover:text-red-300 underline underline-offset-4 ml-2"
              >
                Reset All
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Cards Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 min-h-[400px]">
        {isLoading ? (
          // Initial Load Skeletons
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`initial-${i}`} />)
        ) : (
          <>
            {/* Existing Events */}
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0.3, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <EventCard event={event} onClick={handleEventClick} />
              </motion.div>
            ))}

            {/* "Loading More" Skeletons */}
            {isFetchingNextPage && 
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`next-page-skel-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            }
          </>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500">
            No tours found matching your search. Try adjusting the filters!
          </div>
        )}
      </motion.div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="flex justify-center mt-16 pb-12">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={`
                relative group flex items-center gap-4 px-10 py-5 
                rounded-full text-white font-bold transition-all duration-500
                ${isFetchingNextPage 
                  ? "bg-gray-800 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-emerald-600 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"}
              `}
            >
              {isFetchingNextPage ? (
                <>
                  <CompassLoader />
                  <span className="animate-pulse tracking-wide text-gray-400">Discovering more...</span>
                </>
              ) : (
                <>
                  <span className="tracking-wide">Expand the Journey</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* Modal Overlay */}
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      </div>
    </section>
  );
}