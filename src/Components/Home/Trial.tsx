import React from "react";
import { motion } from "framer-motion";

const Trial: React.FC = () => {
  const containerVarient = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={containerVarient}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-3xl mx-auto px-4"
      >
        {/* Heading */}
        <motion.h2 className="text-hero-title font-extrabold text-primary mb-6 leading-tight">
          Get started in 30 seconds. <br /> Free for 90 days.
        </motion.h2>

        {/* Subtitle */}
        <motion.p className="text-textSecondary text-body-lg leading-relaxed mb-10">
          Simplify your business operations and consolidate your projects,
          clients, and team into one integrated, easy-to-use platform.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#"
          className="bg-primary hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-btn-lg shadow-btn-shadow transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Get started
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Trial;
