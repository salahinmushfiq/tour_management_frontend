import React, { useState, useEffect, useRef, useCallback } from "react";
import AiAssistant from "../ai_agent/AiAssistant";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegWindowMinimize } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { Bot, Zap, Compass, Sparkles } from "lucide-react"; 

const STORAGE_KEYS = {
  OPEN: "trekbot_chat_open",
  MINIMIZED: "trekbot_chat_minimized",
  UNREAD: "trekbot_has_new_message",
};

const AiChatPopup = () => {
  const [open, setOpen] = useState(() => localStorage.getItem(STORAGE_KEYS.OPEN) === "true");
  const [minimized, setMinimized] = useState(
    () => localStorage.getItem(STORAGE_KEYS.MINIMIZED) === "true"
  );
  const [hasNewMessage, setHasNewMessage] = useState(
    () => localStorage.getItem(STORAGE_KEYS.UNREAD) === "true"
  );
  const [messages, setMessages] = useState([]);

  const popupRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPEN, open);
    localStorage.setItem(STORAGE_KEYS.MINIMIZED, minimized);
  }, [open, minimized]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNREAD, hasNewMessage);
  }, [hasNewMessage]);

  useEffect(() => {
    if (open && !minimized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open, minimized]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getDragConstraints = useCallback(() => {
    if (!popupRef.current) return {};
    const rect = popupRef.current.getBoundingClientRect();
    return {
      top: 90, // Strict clearance for your Navbar
      left: 20,
      right: window.innerWidth - rect.width - 24,
      bottom: window.innerHeight - rect.height - 24,
    };
  }, []);

  const handleMessagesChange = useCallback(
    (updatedMessages) => {
      if (minimized && updatedMessages.length > lastMessageCountRef.current) {
        const lastMsg = updatedMessages[updatedMessages.length - 1];
        if (lastMsg?.role === "assistant") {
          setHasNewMessage(true);
        }
      }
      lastMessageCountRef.current = updatedMessages.length;
    },
    [minimized]
  );

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
    setHasNewMessage(false);
  };

  return (
    <>
      {/* Trigger Button */}
      {!open || minimized ? (
        <motion.button
          onClick={handleOpen}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 dark:bg-blue-600 shadow-[0_15px_50px_rgba(0,0,0,0.3)] text-white border border-white/10"
        >
          <span className="absolute inset-0 rounded-2xl bg-blue-400 animate-pulse opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
          <Bot size={30} className="relative z-10 text-blue-100" />
          {hasNewMessage && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-bounce" />
          )}
          <span className="absolute right-20 px-3 py-1.5 rounded-lg bg-slate-900 text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-0 group-hover:opacity-100 transition-all border border-blue-500/30 whitespace-nowrap pointer-events-none">
            Ask TrekBot
          </span>
        </motion.button>
      ) : null}

      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/40 backdrop-blur-md z-[9998] flex justify-end pt-24 pb-8 px-6 pointer-events-none"
          >
            <motion.div
              ref={popupRef}
              drag
              dragConstraints={getDragConstraints()}
              dragElastic={0.05}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              /* THE MESH LOOK: High-energy Discovery Gradient */
              className="pointer-events-auto w-full sm:w-[450px] h-fit max-h-[85vh] bg-white dark:bg-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] rounded-[3rem] border-[8px] border-white dark:border-slate-800 overflow-hidden flex flex-col ring-1 ring-slate-200 dark:ring-black relative"
            >
              {/* Decorative Mesh Background Blobs (Light Mode Only) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:hidden">
                <div className="absolute -top-[10%] -left-[10%] w-64 h-64 bg-blue-200 rounded-full blur-[80px]" />
                <div className="absolute top-[20%] -right-[10%] w-64 h-64 bg-indigo-200 rounded-full blur-[80px]" />
                <div className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-violet-100 rounded-full blur-[80px]" />
              </div>

              {/* Header: Solid & Sharp */}
              <div className="p-6 bg-slate-950 dark:bg-black flex justify-between items-center relative z-20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 animate-pulse" />
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl relative shadow-lg">
                      <Compass size={22} className="text-white animate-spin-slow" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-[13px] font-black tracking-[0.2em] text-white uppercase">TrekBot Guide</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Sparkles size={10} className="text-yellow-400" />
                      <span className="text-[9px] text-blue-300 font-bold uppercase tracking-widest">Live Exploration Mode</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setMinimized(true)} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <FaRegWindowMinimize size={14} />
                  </button>
                  <button onClick={() => setOpen(false)} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                    <CgClose size={22} />
                  </button>
                </div>
              </div>

              {/* Subtle Status Bar */}
              <div className="z-10 bg-white/90 dark:bg-slate-900/50 backdrop-blur-sm px-6 py-2.5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Identity Verified: AI Discovery Core</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  <div className="w-1 h-1 rounded-full bg-indigo-400" />
                  <div className="w-1 h-1 rounded-full bg-violet-400" />
                </div>
              </div>

              {/* Assistant Component Body */}
              <div className="flex-1 overflow-hidden bg-white/30 dark:bg-slate-950 z-10 backdrop-blur-3xl">
                <AiAssistant
                  messages={messages}
                  setMessages={setMessages}
                  onMessagesChange={handleMessagesChange}
                />
              </div>

              <div className="p-4 bg-white/80 dark:bg-slate-900 text-center border-t border-slate-50 dark:border-white/5 z-20">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                  Start Discovery
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default AiChatPopup;