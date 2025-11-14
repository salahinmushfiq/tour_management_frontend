// src/components/TouristWrapper.jsx
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TouristWrapper = ({ children, scene = "morning" }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize for responsive clouds
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skyGradient = {
    morning: "from-blue-200 via-blue-100 to-blue-50",
    night: "from-[#0f172a] via-[#1e293b] to-[#1e3a8a]",
    trail: "from-yellow-200 via-orange-200 to-green-200",
    dusk: "from-gray-800 via-gray-700 to-blue-900",
  };

  const cardStyle = {
    morning: {
      bg: "bg-white/95",
      text: "text-gray-800",
      border: "border-yellow-100",
      button: "bg-yellow-400 hover:bg-yellow-500 text-gray-800",
    },
    night: {
      bg: "bg-slate-800/90",
      text: "text-gray-100",
      border: "border-blue-900",
      button: "bg-indigo-600 hover:bg-indigo-700 text-gray-100",
    },
    trail: {
      bg: "bg-white/90",
      text: "text-gray-800",
      border: "border-green-300",
      button: "bg-green-400 hover:bg-green-500 text-gray-800",
    },
    dusk: {
      bg: "bg-gray-800/90",
      text: "text-gray-100",
      border: "border-gray-600",
      button: "bg-blue-500 hover:bg-blue-600 text-gray-100",
    },
  };

  // Birds
  const birds = useMemo(
    () =>
      Array.from({ length: 3 }).map(() => ({
        startX: -100 - Math.random() * 200,
        startY: 10 + Math.random() * 50,
        endX: 1100 + Math.random() * 300,
        scale: 1 + Math.random() * 1.2,
        duration: 6 + Math.random() * 4,
        rotate: Math.random() * 30 - 15,
      })),
    []
  );

  // Stars (night only)
  const stars = useMemo(() => {
    if (scene !== "night") return [];
    return Array.from({ length: 15 }).map(() => ({
      top: Math.random() * 60,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
  }, [scene]);

  // Clouds
  const cloudLayers = useMemo(() => {
    return Array.from({ length: 2 }).map((_, layerIndex) =>
      Array.from({ length: 2 }).map(() => ({
        startX: -200 - Math.random() * 300,
        startY: 5 + Math.random() * 20 + layerIndex * 10,
        endX: 1200 + Math.random() * 200,
        duration: 20 + layerIndex * 10 + Math.random() * 10,
        scale: 0.5 + Math.random(),
      }))
    );
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Sky Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${skyGradient[scene]} transition-all duration-1000`}
      />

      {/* Optional Hills / Ground (morning only) */}
      {scene === "morning" && (
        <svg className="absolute bottom-0 w-full h-80 z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#a3e635"
            d="M0,160L60,144C120,128,240,96,360,128C480,160,600,224,720,208C840,192,960,128,1080,144C1200,160,1320,224,1380,256L1440,288L1440,320L0,320Z"
          />
        </svg>
      )}

      {/* Night Scene */}
      {scene === "night" && (
        <>
          <motion.div
            className="absolute top-16 left-1/4 w-20 h-20 bg-yellow-200 rounded-full shadow-lg z-10"
            animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
          />
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute bg-yellow-400 rounded-full z-10"
              style={{
                width: star.size,
                height: star.size,
                top: `${star.top}%`,
                left: `${star.left}%`,
              }}
              animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: star.duration, repeat: Infinity, repeatType: "loop" }}
            />
          ))}
        </>
      )}

      {/* Clouds */}
      {cloudLayers.map((layer, layerIndex) =>
        layer.map(({ startX, startY, endX, duration, scale }, i) => {
          const cloudWidth = windowWidth < 768 ? 100 * scale : 300 * scale;
          const cloudHeight = windowWidth < 768 ? 60 * scale : 180 * scale;
          return (
            <motion.svg
              key={`${layerIndex}-${i}`}
              className="absolute z-10 will-change-transform"
              viewBox="0 0 210 297"
              style={{ top: `${startY}%`, left: startX, width: cloudWidth, height: cloudHeight, opacity: 0.6 }}
              initial={{ x: startX }}
              animate={{ x: endX }}
              transition={{ duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            >
              <path
                style={{ fill: "rgba(220,220,230,0.6)", stroke: "rgba(180,180,200,0.5)", strokeWidth: 1.5 }}
                d="m 118.32,114.33 c -10.38,0.004 -19.91,5.71 -24.82,14.85 -3.47,-2.62 -7.7,-4.05 -12.05,-4.06 -11.07,0 -20.05,8.98 -20.05,20.05 0.004,0.21 0.012,0.42 0.023,0.63 -0.5,-0.047 -1.0,-0.072 -1.51,-0.075 -9.47,0 -17.14,7.68 -17.14,17.14 0,9.47 7.68,17.14 17.14,17.14 h81.42 c9.47,0 17.14,-7.67 17.14,-17.14 -0.004,-7.59 -4.996,-14.27 -12.27,-16.43 0.19,-1.3 0.3,-2.61 0.31,-3.93 0,-15.57 -12.62,-28.19 -28.19,-28.19 z"
              />
            </motion.svg>
          );
        })
      )}

      {/* Birds */}
      {birds.map(({ startX, startY, endX, scale, duration, rotate }, i) => (
        <motion.svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="275 258 1551 829"
          className="absolute z-20 will-change-transform"
          style={{ top: `${startY}%`, left: startX, width: 120 * scale, height: 60 * scale }}
          initial={{ x: startX, rotate }}
          animate={{ x: endX, y: [startY, startY + 10, startY - 5], rotate: [rotate, rotate + 15, rotate - 15, rotate], scaleY: [1, 0.9, 1] }}
          transition={{ duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        >
          <g transform="scale(-1,1) translate(-1551,0)">
            <path d="M1110 363c-1.79-1.27-3.41-2.81-5.35-3.82..." fill="#222" />
          </g>
        </motion.svg>
      ))}

      {/* Pop-in Card */}
      <motion.div
        role="main"
        aria-label="Authentication Card"
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -50 }}
        transition={{ duration: 0.7, ease: "backOut" }}
        className={`relative z-30 w-full mx-4 max-w-md p-8 rounded-2xl shadow-2xl border ${cardStyle[scene].bg} ${cardStyle[scene].border}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TouristWrapper;
