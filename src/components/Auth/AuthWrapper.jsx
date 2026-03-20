// src/components/AuthWrapper.jsx
import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";

const FogLayer = memo(() => (
  <div className="absolute inset-0 z-20 pointer-events-none">
    <motion.div
      animate={{ x: ["-25%", "0%", "-25%"], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] w-[200%] h-96 bg-gradient-to-t from-white/20 via-white/5 to-transparent blur-[10px]"
    />
  </div>
));

const CampScene = memo(({ isDusk, scene }) => {
  const stars = useMemo(() => 
    [...Array(30)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: 2 + Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
      {/* ✨ Stars */}
      {(scene === "night" || scene === "dusk") && stars.map((s) => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: s.duration, repeat: Infinity }}
          className="absolute bg-white rounded-full shadow-[0_0_8px_white]"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
        />
      ))}

      {/* 🌲 Pine Forest Silhouette */}
      <div className="absolute bottom-8 w-full flex justify-around items-end px-4 opacity-50">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex flex-col items-center ${i % 2 === 0 ? 'scale-125' : 'scale-100 opacity-60'}`}>
            <svg width="100" height="150" viewBox="0 0 100 150" fill={isDusk ? "#0f172a" : "#020617"}>
              <path d="M50 5 L65 40 H55 L75 80 H60 L85 130 H15 L40 80 H25 L45 40 H35 Z" />
              <rect x="46" y="130" width="8" height="20" fill="#000" />
            </svg>
          </div>
        ))}
      </div>

      {/* ⛺ Tent with Lantern Glow */}
      <div className="absolute bottom-6 left-[calc(50%-140px)] flex flex-col items-center scale-150">
        <div className="relative">
          {(scene === "night" || scene === "dusk") && (
            <motion.div 
              animate={{ opacity: [0.4, 0.7, 0.5, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-orange-400 blur-md rounded-full scale-75"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          )}
          <svg width="100" height="60" viewBox="0 0 100 60" className="relative z-10">
            <path d="M10 55 L50 5 L90 55 Z" fill={isDusk ? "#1e293b" : "#0f172a"} />
            <path d="M50 5 L65 55 H35 Z" fill={scene === "night" ? "#f59e0b" : "black"} fillOpacity={scene === "night" ? "0.2" : "0.3"} />
            <rect x="48" y="5" width="4" height="50" fill="black" fillOpacity="0.2" />
          </svg>
        </div>
        <div className="w-24 h-2 bg-black/20 blur-sm rounded-full mt-[-2px]" />
      </div>

      {/* 🔥 The Bonfire Structure */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 overflow-visible">
        
        {/* 💨 Tight Randomized Smoke (Active in Dusk) */}
        {isDusk && (
          <div className="absolute bottom-4 w-24 h-64 flex justify-center items-end overflow-visible pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`smoke-${i}`}
                initial={{ y: 0, x: 0, opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ 
                  y: -300, 
                  x: [0, (i % 2 === 0 ? 15 : -15), (i % 2 === 0 ? -10 : 25), 5], // Tighter horizontal movement
                  opacity: [0, 0.8, 0.7, 0], 
                  scale: [1, 2, 4, 6],
                  rotate: [0, 45, -45, 90],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  delay: i * 0.75, 
                  ease: "easeOut" 
                }}
                className="absolute"
              >
                <svg width="40" height="40" viewBox="0 0 50 50" className="blur-lg">
                  <path 
                    d="M25 0 C40 10 50 25 50 35 C50 45 40 50 25 50 C10 50 0 45 0 35 C0 25 10 10 25 0" 
                    fill="rgba(200, 200, 220, 0.6)" 
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        )}

        {/* 🔥 Active Flames (Active in Night) */}
        {scene === "night" && (
          <div className="relative w-16 h-24 flex justify-center items-end z-30">
             <motion.svg 
               width="50" height="70" viewBox="0 0 50 80" className="drop-shadow-[0_0_20px_#ea580c]"
               animate={{ scaleY: [1, 1.1, 0.9, 1.05], scaleX: [1, 0.95, 1.05, 1] }}
               transition={{ duration: 0.2, repeat: Infinity }}
             >
               <motion.path 
                animate={{ d: [
                  "M25 0 C30 20 45 40 45 65 C45 80 35 80 25 80 C15 80 5 80 5 65 C5 40 20 20 25 0",
                  "M25 5 C35 25 40 45 40 65 C40 80 35 80 25 80 C15 80 10 80 10 65 C10 45 15 25 25 5"
                ]}}
                transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
                fill="#ea580c" 
               />
               <path d="M25 20 C30 35 35 50 35 65 C35 75 30 75 25 75 C20 75 15 75 15 65 C15 50 20 35 25 20" fill="#facc15" />
             </motion.svg>
            
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -100], x: [0, (i - 2) * 25], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="absolute w-1 h-1 bg-orange-400 rounded-full"
              />
            ))}
          </div>
        )}

        {/* 🪵 Teepee Stick Stack with Fire Residue */}
        <div className="relative w-20 h-10 flex justify-center items-end mt-[-30px] z-20">
          {/* 🔥 Glowing Residue (Visible in Dusk and Night) */}
          {(scene === "night" || isDusk) && (
            <motion.div 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-1 w-12 h-4 bg-orange-600 blur-md rounded-full z-0"
            />
          )}
          
          <div className="absolute w-12 h-1 bg-stone-900 rounded-full rotate-[15deg] -translate-x-3 shadow-lg" />
          <div className="absolute w-12 h-1 bg-stone-950 rounded-full rotate-[-25deg] translate-x-3 shadow-lg" />
          <div className="absolute w-12 h-1 bg-stone-800 rounded-full rotate-[35deg] -translate-y-1" />
          <div className="absolute w-12 h-1.5 bg-stone-900 rounded-full rotate-[-35deg] -translate-y-1" />
          <div className="absolute w-14 h-1 bg-black rounded-full translate-y-2 opacity-40 blur-[2px]" />
        </div>
      </div>

      <div className={`absolute bottom-0 w-full h-8 ${isDusk ? 'bg-slate-950' : 'bg-black'}`} />
    </div>
  );
});

const AuthWrapper = ({ children, scene = "morning" }) => {
  const skyGradient = {
    morning: "from-sky-300 via-blue-100 to-white",
    night: "from-[#020617] via-[#0f172a] to-[#1e1b4b]",
    trail: "from-yellow-100 via-orange-100 to-emerald-50",
    // dusk: "from-[#0f172a] via-[#312e81] to-[#fb7185]",
    dusk: "from-gray-800 via-gray-700 to-[#fb7185]",
  };

  const cardStyle = {
    morning: "bg-white/90 border-blue-50 shadow-blue-100/50",
    night: "bg-slate-950/40 backdrop-blur-3xl border-white/10 shadow-orange-950/20",
    trail: "bg-white/95 border-emerald-100",
    dusk: "bg-slate-900/60 backdrop-blur-2xl border-white/10 shadow-rose-950/20",
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden font-sans">
      <div className={`absolute inset-0 bg-gradient-to-b ${skyGradient[scene]} transition-all duration-1000`} />
      {scene === "dusk" && <FogLayer />}
      {(scene === "night" || scene === "dusk") && (
        <CampScene isDusk={scene === "dusk"} scene={scene} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className={`relative z-40 w-full mx-4 max-w-md p-10 rounded-[2.5rem] shadow-2xl border ${cardStyle[scene]}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthWrapper;