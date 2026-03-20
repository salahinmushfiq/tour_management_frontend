import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react"; // Matching your other Lucide icons

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Adventure Traveler",
    feedback: "Incredible experience! The discovery interface made finding hidden gems effortless. Booking tours has never been this smooth.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Ahmed Raza",
    role: "Tour Organizer",
    feedback: "The multi-organizer collaboration feature is a game-changer for my team. The dashboard layout is intuitive and powerful.",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Ling Chen",
    role: "Expedition Guide",
    feedback: "Finally, a platform that understands what organizers actually need. The UI is gorgeous and the performance is lightning fast.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      
      className="py-24 bg-gray-900 relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background Decorative Glow */}
      <div id="reviews" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Voices of the <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Join thousands of travelers and organizers who have transformed their discovery experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/60 transition-all duration-500"
            >
              {/* Animated Border Accent on Hover */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/30 transition-colors duration-500" />
              
              <Quote className="text-blue-500 w-10 h-10 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <p className="text-slate-300 italic mb-8 leading-relaxed relative z-10">
                “{t.feedback}”
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover relative border-2 border-slate-900"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;