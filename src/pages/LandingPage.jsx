import React from "react";
import Navbar from '../components/Navbar';
import About from '../components/About';
import Categories from "../components/Categories";
import Features from "../components/Features";
import Tours from "../components/Tours";
import CalendarSection from "../components/CalendarSection";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import EventSection from "../components/EventSection";
import AnimatedSection from "./AnimatedSection";

import ScrollJourney from "../components/ScrollJourney";
import CollageGallery from "../components/CollageGallery";
import { ParallaxProvider } from 'react-scroll-parallax';

const LandingPage = () => {
    return (
    <ParallaxProvider>
      <Navbar/>
      <Hero />
      {/* <Organizers /> */}
      {/* <About/>
      
      <Categories/>
      <Features/>
      <Tours />
      
      <CalendarSection />
      <Testimonials />
      <CTA /> */}
       

      
      <div id="journey-wrapper" className="relative z-10 bg-opacity-40" >
        <ScrollJourney />
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Categories /></AnimatedSection>
        {/* <AnimatedSection><Features /></AnimatedSection> */}
        {/* <AnimatedSection><Tours /></AnimatedSection> */}
       {/* <AnimatedSection><CalendarSection/></AnimatedSection> */}
       
       
      </div>
      <AnimatedSection><EventSection/></AnimatedSection>
      <div className="h-16 md:h-24"></div>

       <CollageGallery/>
       <AnimatedSection><Testimonials /></AnimatedSection>
       
      
      <AnimatedSection><CTA /></AnimatedSection>
      <Footer />
    </ParallaxProvider>
  );

}


export default LandingPage;