// src/components/AnimatedSection.tsx
import { motion } from "framer-motion";

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

export default AnimatedSection;
