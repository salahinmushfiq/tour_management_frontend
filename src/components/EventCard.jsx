import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

const EventCard = memo(({ event, onClick }) => {
  const locationData = useMemo(() => {
    if (!event.start_location) return { name: "Unknown Location", coords: null };
    const match = event.start_location.match(/(.+)\s\((.+)\)/);
    return match ? { name: match[1], coords: match[2] } : { name: event.start_location, coords: null };
  }, [event.start_location]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationData.coords || locationData.name}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-44 w-full overflow-hidden" onClick={() => onClick(event)}>
        <img
          loading="lazy"
          decoding="async"
          src={event.cover_image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800"}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        
        {/* Category Tag - Using your BRAND color */}
        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand text-white rounded-full shadow-lg">
          {event.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 
          className="text-xl font-bold text-white group-hover:text-brand transition-colors cursor-pointer line-clamp-1"
          onClick={() => onClick(event)}
        >
          {event.title}
        </h3>

        {/* Location Block */}
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-sm font-medium text-slate-200">{locationData.name}</span>
          </div>

          {locationData.coords && (
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-1 rounded bg-dark/50 border border-slate-700 hover:border-accent/50 transition-all group/coord"
            >
              <span className="text-[10px] font-mono text-slate-400 group-hover/coord:text-accent">
                GPS: {locationData.coords}
              </span>
              <svg className="w-3 h-3 text-slate-500 group-hover/coord:text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              </svg>
            </a>
          )}
        </div>

        {/* Footer - Using your ACCENT color */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-700/50">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Cost</span>
            <span className="text-sm font-bold text-accent">BDT {event.cost_per_person}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Starts</span>
            <span className="text-sm text-slate-300">
              {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default EventCard;