import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollJourney() {
  const pathRef = useRef(null);
  const markerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#journey-track",
          // SYNC FIX: Start when top hits top, end when bottom hits bottom
          start: "top top", 
          end: "bottom bottom", 
          scrub: true, // true (or 0) provides the most immediate "lock"
          invalidateOnRefresh: true, 
        }
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      }, 0)
      .to(markerRef.current, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      }, 0);

    }, "#journey-track");

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 1000" 
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={pathRef}
          // Straightened the path slightly to keep the marker closer to the center-line
          d="M50,0 C65,250 35,500 65,750 S50,1000 50,1000"
          stroke="url(#journey-grad)"
          strokeWidth="1"
          strokeDasharray="10,15"
        />
        <defs>
          <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={markerRef} className="absolute top-0 left-0 w-6 h-6 -ml-3 -mt-3 z-10">
        <div className="w-full h-full bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]" />
      </div>
    </div>
  );
}