import { motion } from "framer-motion";
import { Compass, Users, CalendarCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Compass className="text-brand w-7 h-7" />,
    title: "Smart Itineraries",
    desc: "Auto-generate trip plans that match your vibe — from chill to thrill.",
  },
  {
    icon: <Users className="text-brand w-7 h-7" />,
    title: "Collaborative Planning",
    desc: "Team up with friends or co-host with other organizers in real time.",
  },
  {
    icon: <CalendarCheck className="text-brand w-7 h-7" />,
    title: "One-Tap Booking",
    desc: "Everything in one place — no spreadsheets, no chaos. Just vibes.",
  },
  {
    icon: <Sparkles className="text-brand w-7 h-7" />,
    title: "Tour Highlights Boost",
    desc: "Show off your best moments with interactive promos & spotlight reels.",
  },
];

export default function About() {
  return (
    <section className="relative overflow-hidden py-4 bg-black/10 backdrop-blur-sm">
      {/* Background */}
      {/* <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=format&fit=crop&w=1600&q=80"
          alt="Ocean adventure theme"
          className="w-full h-full object-cover object-center opacity-80"
        />
      </div> */}

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* 👇 SVG Decorative Shape */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 -z-10 opacity-30 pointer-events-none">
          <svg
            width="700"
            height="700"
            viewBox="0 0 700 700"
            xmlns="http://www.w3.org/2000/svg"
            className="blur-2xl"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b59f90" />
                <stop offset="100%" stopColor="#f4f1ed" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M550,400Q520,500,430,540Q340,580,250,540Q160,500,120,420Q80,340,130,250Q180,160,270,140Q360,120,430,160Q500,200,550,270Q600,340,550,400Z"
            />
          </svg>
        </div>

        {/* 👇 Motion Card */}
  
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-10 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">
            Why Tour Mate Feels Built for You
          </h2>
          <p className="text-lg text-dark/80 mb-10">
            Whether you're a solo explorer, a group planner, or a tour company — Tour Mate makes travel planning effortless and way more fun.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold text-dark mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-700">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
