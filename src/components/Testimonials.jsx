import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa"; // install with: npm i react-icons

const testimonials = [
  {
    name: "Sarah",
    feedback: "Incredible experience! Booking tours has never been easier.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Ahmed",
    feedback: "Love the multi-organizer collaboration feature!",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Ling",
    feedback: "User-friendly and packed with features for organizers.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

// Animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-indigo-100 to-white text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <motion.h2
        className="text-4xl font-extrabold text-brand-dark mb-12"
        variants={item}
      >
        What Users Say
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <FaQuoteLeft className="text-brand text-2xl mb-4" />
            <p className="italic text-gray-700 mb-6">“{t.feedback}”</p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h4 className="font-semibold text-brand-dark">{t.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;
