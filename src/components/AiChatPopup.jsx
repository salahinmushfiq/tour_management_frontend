import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Minus, Globe, Shield, RefreshCcw } from "lucide-react";
import AiAssistant from "../ai_agent/AiAssistant";

const AiChatPopup = () => {
  // Load initial states from localStorage
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem("trek_chat_open") === "true");
  const [isMinimized, setIsMinimized] = useState(() => localStorage.getItem("trek_chat_minimized") === "true");
  
  // Load messages from localStorage to prevent wipe on reload
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("trek_chat_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state changes to localStorage
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
    <>
      {/* Floating Toggle Trigger */}
      {/* {(!isOpen || isMinimized) && (
        <motion.button
          layoutId="chat-box"
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          className="fixed bottom-8 right-8 z-[9999] w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_8px_30px_rgb(79,70,229,0.4)] flex items-center justify-center border border-white/20 hover:scale-110 transition-transform"
        >
          <Bot size={32} />
          {messages.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
          )}
        </motion.button>
      )} */}
      
        {(!isOpen || isMinimized) && (
        <motion.button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 dark:bg-blue-600 shadow-[0_15px_50px_rgba(0,0,0,0.3)] text-white border border-white/10"
        >
          <span className="absolute inset-0 rounded-2xl bg-blue-400 animate-pulse opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
          <Bot size={30} className="relative z-10 text-blue-100" />
          {messages.length > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-bounce" />
          )}
          <span className="absolute right-20 px-3 py-1.5 rounded-lg bg-slate-900 text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-0 group-hover:opacity-100 transition-all border border-blue-500/30 whitespace-nowrap pointer-events-none">
            Ask TrekBot
          </span>
        </motion.button>
      )
      }

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            layoutId="chat-box"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 z-[9999] w-[420px] h-[650px] max-h-[85vh] flex flex-col bg-white dark:bg-[#0B0F1A] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-white dark:bg-transparent border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
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
                <button 
                  title="Clear History"
                  onClick={clearSession}
                  className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                >
                  <RefreshCcw size={14} />
                </button>
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  <Minus size={20} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              <AiAssistant messages={messages} setMessages={setMessages} />
            </div>

            {/* Subtle Footer */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-black/40 flex justify-between items-center border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Database_Sync_Ok</span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 opacity-50 uppercase">v3.0.4-Discovery</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatPopup;