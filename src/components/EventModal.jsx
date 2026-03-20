import React, { useMemo,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventModal({ event, onClose }) {
  const parseLoc = (locString) => {
    if (!locString) return { name: "TBA", coords: null };
    const match = locString.match(/(.+)\s\((.+)\)/);
    return match ? { name: match[1], coords: match[2] } : { name: locString, coords: null };
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const start = useMemo(() => parseLoc(event?.start_location), [event?.start_location]);
  const end = useMemo(() => parseLoc(event?.end_location), [event?.end_location]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          // Added 'top-20' and 'pb-10' to ensure it doesn't hide under Navbar or hit screen bottom
          className="fixed inset-0 top-16 z-[60] flex items-center justify-center px-4 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            className="bg-slate-900 border border-slate-700/50 rounded-3xl max-w-4xl w-full max-h-full relative shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Title & Status */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${event.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {event.status || 'Scheduled'}
                  </span>
                  <span className="text-slate-500 text-xs">ID: #{event.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{event.title}</h2>
              </div>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 transition-colors text-2xl">&times;</button>
            </div>

            {/* Scrollable Body - Two Column Layout */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Image & Route */}
                <div className="lg:col-span-2 space-y-6">
                  <img src={event.cover_image} alt={event.title} className="w-full h-64 object-cover rounded-2xl shadow-inner border border-slate-800" />
                  
                  <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-800">
                    <h4 className="text-[10px] uppercase tracking-widest text-brand font-bold mb-4 text-center">Journey Track</h4>
                    <div className="flex items-center justify-between px-4">
                       <div className="text-center">
                          <p className="text-white font-bold text-sm">{start.name}</p>
                          <p className="text-[10px] font-mono text-slate-500">{start.coords}</p>
                       </div>
                       <div className="flex-grow mx-4 border-t-2 border-dashed border-slate-700 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-1 rounded-full border border-slate-700">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                          </div>
                       </div>
                       <div className="text-center">
                          <p className="text-white font-bold text-sm">{end.name}</p>
                          <p className="text-[10px] font-mono text-slate-500">{end.coords}</p>
                       </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-400 mb-2">About the Expedition</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">{event.description}</p>
                  </div>
                </div>

                {/* Right Column: Details & Stats */}
                <div className="space-y-6">
                  <div className="bg-dark/50 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <DetailItem label="Organizer" value={event.organizer} sub={event.organizer_email} />
                    <DetailItem label="Category" value={event.category} />
                    <DetailItem label="Timeline" value={`${new Date(event.start_date).toLocaleDateString()} — ${new Date(event.end_date).toLocaleDateString()}`} />
                    <DetailItem label="Participants" value={`${event.participants?.length || 0} / ${event.max_participants}`} />
                    <DetailItem label="Cost" value={`BDT ${event.cost_per_person}`} highlight />
                  </div>

                  {/* Guides Section */}
                  {event.guides?.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-3 tracking-widest">Expert Guides</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.guides.map((guide, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700">
                            👤 {guide.name || guide}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Offers Section */}
                  {event.offers?.length > 0 && (
                    <div className="bg-brand/10 border border-brand/20 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-accent mb-2">Active Offers</h4>
                      {event.offers.map((offer, i) => (
                        <div key={i} className="text-xs text-slate-300 mb-2 last:mb-0">
                          <span className="text-white font-bold">• {offer.title}:</span> {offer.description}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 bg-slate-800/80 border-t border-slate-700/50 flex items-center justify-between">
              <div className="flex gap-2">
                {event.is_custom_group && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-bold rounded-full border border-purple-500/30">
                    Custom Group Only
                  </span>
                )}
              </div>
              <button className="px-8 py-3 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl transition-all shadow-lg active:scale-95">
                Apply for Entry
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailItem({ label, value, sub, highlight }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">{label}</span>
      <span className={`text-sm font-bold ${highlight ? 'text-accent' : 'text-slate-200'}`}>{value}</span>
      {sub && <span className="text-[10px] text-slate-500">{sub}</span>}
    </div>
  );
}