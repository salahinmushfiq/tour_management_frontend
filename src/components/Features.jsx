// components/Features.jsx
import { motion } from 'framer-motion';
import { FaUsers, FaMapMarkedAlt, FaClock, FaBullhorn } from 'react-icons/fa';

const features = [
  {
    icon: <FaUsers className="text-3xl text-brand" />,
    title: 'Multi-Organizer',
    desc: 'Support multiple organizers under a unified dashboard.',
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-brand" />,
    title: 'Tour Mapping',
    desc: 'View and manage all tour destinations interactively.',
  },
  {
    icon: <FaClock className="text-3xl text-brand" />,
    title: 'Real-Time Schedules',
    desc: 'Track live availability, bookings, and changes.',
  },
  {
    icon: <FaBullhorn className="text-3xl text-brand" />,
    title: 'Smart Promotion',
    desc: 'Boost tours using personalized promotion tools.',
  },
];

export default function Features() {
  return (
    <section className="py-20 backdrop-blur-sm bg-black/10" style={{background:"url(https://images.pexels.com/photos/33036082/pexels-photo-33036082.jpeg?auto=format&fit=crop&w=2100&q=80)"}}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-12">
          Why Choose <span className="text-brand">Tour Mate?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-base rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-80">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
