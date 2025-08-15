// components/TourCategories.jsx
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Beach Escapes',
    image: 'https://images.pexels.com/photos/922100/pexels-photo-922100.png?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mountain Treks',
    image: 'https://images.pexels.com/photos/4028995/pexels-photo-4028995.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'City Tours',
    image: 'https://images.pexels.com/photos/11161254/pexels-photo-11161254.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cultural Heritage',
    image: 'https://images.pexels.com/photos/33029036/pexels-photo-33029036.jpeg?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Categories() {
  return (
    <section className=" py-20 backdrop-blur-md bg-black/10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-12">
          Explore by <span className="text-brand">Category</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow-lg">
                {cat.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
