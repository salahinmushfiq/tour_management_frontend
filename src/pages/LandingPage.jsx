//src/pages/LandingPage.jsx
import React, { lazy, Suspense, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Instant imports
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { LazySection } from "../components/LazySection";

// Lazy imports
// const ScrollJourney = lazy(() => import("../components/ScrollJourney"));
const About = lazy(() => import("../components/About"));
const Categories = lazy(() => import("../components/Categories"));
const EventSection = lazy(() => import("../components/EventSection"));
const StickyStoryGallery = lazy(() => import("../components/StickyStoryGallery"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Footer = lazy(() => import("../components/Footer"));
const AiChatPopup = lazy(() => import("../components/AiChatPopup"));


function SectionLoader({ height = "400px" }) {
  return (
    <div
      style={{ height }}
      className="flex flex-col items-center justify-center w-full bg-gray-900/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-shimmer"
           style={{ backgroundSize: '200% 100%' }} />
      <div className="relative">
        <div className="w-12 h-12 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
        <div className="absolute inset-0 blur-lg bg-blue-500/20 animate-pulse" />
      </div>
    </div>
  );
}

// Motion variant for section reveal
const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function LandingPage() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen selection:bg-blue-500/30">
      
      <Suspense fallback={null}><AiChatPopup /></Suspense>

      <Navbar />
      <Hero />

      <div id="journey-track" className="relative w-full misty-transition pb-20">

        {/* <LazySection minHeight="500px" onVisible={() => ScrollTrigger.refresh()}>
          <Suspense fallback={<SectionLoader height="500px" />}>
            <ScrollJourney />
          </Suspense>
        </LazySection> */}

        <LazySection minHeight="300px" onVisible={() => ScrollTrigger.refresh()}>
          <Suspense fallback={<SectionLoader height="300px" />}>
            <About />
          </Suspense>
        </LazySection>

        <LazySection minHeight="300px" onVisible={() => ScrollTrigger.refresh()}>
          <Suspense fallback={<SectionLoader height="300px" />}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <Categories />
            </motion.div>
          </Suspense>
        </LazySection>

        <LazySection minHeight="800px" onVisible={() => ScrollTrigger.refresh()}>
          <Suspense fallback={<SectionLoader height="800px" />}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <EventSection />
            </motion.div>
          </Suspense>
        </LazySection>

      </div>

      <LazySection minHeight="600px" onVisible={() => ScrollTrigger.refresh()}>
        <Suspense fallback={<SectionLoader height="600px" />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="relative z-20"
          >
            <StickyStoryGallery />
          </motion.div>
        </Suspense>
      </LazySection>

      <LazySection minHeight="500px" onVisible={() => ScrollTrigger.refresh()}>
        <Suspense fallback={<SectionLoader height="500px" />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="relative z-30 bg-gray-900"
          >
            <Testimonials />
            <Footer />
          </motion.div>
        </Suspense>
      </LazySection>

    </div>
  );
}