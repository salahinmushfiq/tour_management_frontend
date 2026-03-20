// src/components/SessionModal.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Clock } from 'lucide-react';

const SessionModal = () => {
  const { extendSession, logout, showExpiryWarning, setShowExpiryWarning, countdown } = useAuth();

  if (!showExpiryWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in">
      {/* Container: Light mode uses white/90, Dark mode uses slate-900/90 */}
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/50 rounded-3xl shadow-2xl p-8 w-full max-w-sm relative backdrop-blur-xl">
        
        <button
          onClick={() => setShowExpiryWarning(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5 border border-blue-100 dark:border-slate-700">
            <Clock className={`w-7 h-7 ${countdown <= 30 ? "text-red-500 animate-pulse" : "text-blue-500 dark:text-blue-400"}`} />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Session Timeout
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
            You will be logged out in:
            <span className={`text-4xl font-black block mt-3 tabular-nums ${
                countdown <= 30 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
            </span>
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={extendSession}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Keep Exploring
            </button>
            
            <button
              onClick={logout}
              className="w-full py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl hover:text-red-500 transition-all"
            >
              Logout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;