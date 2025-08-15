// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// const ScrollJourney = () => {
//   const markerRef = useRef(null);

//   useEffect(() => {
//     gsap.to(markerRef.current, {
//       scrollTrigger: {
//         trigger: "#journey-wrapper",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1,
//       },
//       motionPath: {
//         path: "#trekPath",
//         align: "#trekPath",
//         autoRotate: false,
//         alignOrigin: [0.5, 0.5],
//       },
//     });
//   }, []);

//   return (
//     <div className="absolute left-auto right-auto top-0 hidden md:block h-full w-20 z-10 pointer-events-none">
//       <svg
//         id="journeySVG"
//         className="h-full w-full"
//         viewBox="0 0 100 1000"
//         preserveAspectRatio="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           id="trekPath"
//           d="M50 0 
//              C 50 150, 30 250, 50 350 
//              C 90 450, 30 550, 50 650 
//              C 100 750, 30 850, 50 1000"
//           stroke="#7f6d5f"
//           strokeDasharray="10 10"
//           strokeWidth="4"
//           fill="none"
//         />
//         <circle ref={markerRef} r="8" fill="#f97316" />
//       </svg>
//     </div>
//   );
// };

// export default ScrollJourney;


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ScrollJourney = () => {
  const markerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(markerRef.current, {
        scrollTrigger: {
          trigger: "#journey-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        motionPath: {
          path: "#trekPath",
          // Removed align because SVG scale mismatch breaks accuracy
          autoRotate: false,
        },
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 hidden md:block h-full w-24 z-10 pointer-events-none">
      <svg
        id="journeySVG"
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="trekPath"
          d="
            M50 0
            C 20 50, 80 100, 50 150
            C 0 200, 100 250, 50 300
            C 80 320, 20 380, 50 400

            C 60 420, 60 460, 50 480
            C 40 500, 40 540, 50 560

            C 0 600, 100 640, 50 680
            C 20 720, 80 760, 50 800
            C 0 850, 100 900, 50 950
            C 40 980, 60 980, 50 1000
          "
          stroke="#7f6d5f"
          strokeDasharray="10 10"
          strokeWidth="4"
          fill="none"
        />
        <circle ref={markerRef} r="8" fill="#f97316" />
      </svg>
    </div>
  );
};

export default ScrollJourney;
