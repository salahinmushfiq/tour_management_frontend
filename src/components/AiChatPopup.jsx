import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Bot, X, Minus, Globe, Shield, RefreshCcw, GripHorizontal } from "lucide-react";
import AiAssistant from "../ai_agent/AiAssistant";

const AiChatPopup = () => {
  const constraintsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem("trek_chat_open") === "true");
  const [isMinimized, setIsMinimized] = useState(() => localStorage.getItem("trek_chat_minimized") === "true");
  const [isMobile, setIsMobile] = useState(false);
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("trek_chat_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Handle Responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem("trek_chat_open", isOpen);
    localStorage.setItem("trek_chat_minimized", isMinimized);
    localStorage.setItem("trek_chat_history", JSON.stringify(messages));
  }, [isOpen, isMinimized, messages]);

  const clearSession = () => {
    if(window.confirm("Terminate current session and wipe local history?")) {
      setMessages([]);
      localStorage.removeItem("trek_session_id");
      localStorage.removeItem("trek_chat_history");
    }
  };

  return (
    // This div acts as the "drag boundary" covering the whole screen
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9999]">
      
      {/* Floating Toggle Trigger */}
      {(!isOpen || isMinimized) && (
        <motion.button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 pointer-events-auto group flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 dark:bg-blue-600 shadow-2xl text-white border border-white/10"
        >
          <Bot size={30} className="relative z-10 text-blue-100" />
          {messages.length > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-bounce" />
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            drag={!isMobile} // Disable drag on mobile for better scrolling experience
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            layoutId="chat-box"
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
            className={clsx(
              "pointer-events-auto flex flex-col bg-white dark:bg-[#0B0F1A] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 overflow-hidden",
              isMobile 
                ? "fixed inset-x-0 bottom-0 top-0 rounded-none w-full h-full" // Full screen mobile
                : "fixed bottom-8 right-8 w-[420px] h-[650px] rounded-[2.5rem]" // Floating desktop
            )}
          >
            {/* Draggable Header Handle (Desktop Only) */}
            {!isMobile && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                <GripHorizontal size={16} className="text-slate-400" />
              </div>
            )}

            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-white dark:bg-transparent border-b border-slate-100 dark:border-white/5 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-lg">
                  <Globe size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em] dark:text-white">Discovery Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <Shield size={10} className="text-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Secured Node</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button title="Clear" onClick={clearSession} className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                  <RefreshCcw size={14} />
                </button>
                {!isMobile && (
                  <button onClick={() => setIsMinimized(true)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <Minus size={20} />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
              <AiAssistant messages={messages} setMessages={setMessages} />
            </div>

            {/* Subtle Footer */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-black/40 flex justify-between items-center border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest italic">Link_Stable</span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 opacity-50 uppercase">v4.0.0-Discovery</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiChatPopup;