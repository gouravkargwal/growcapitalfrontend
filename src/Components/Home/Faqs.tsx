import React, { useState } from "react";

import { motion } from "framer-motion";

interface AccordionProps {
  question: string;
}

const Faqs: React.FC = () => {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="min-h-screen bg-neutral flex flex-col justify-center items-center p-8">
      {/* Motion wrapper for animation */}
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        className="text-center mb-10"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h1 className="text-hero-title font-extrabold text-primary mb-6 leading-tight">
          Your Money Questions, Answered
        </h1>
        <p className="text-textSecondary text-lg">
          Learn more about how we can help you grow and manage your finances
          with ease.
        </p>
      </motion.div>

      {/* Accordion Section with animation */}
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        className="w-full max-w-3xl space-y-4"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Accordion question="5.00% APY? Is this a promotional rate?" />
        <Accordion question="What's so great about a high APY anyway?" />
        <Accordion question="How should I think about bonds vs. cash?" />
        <Accordion question="What if I don’t fully trust robots with my investments?" />
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-10 px-8 py-4 bg-primary text-white font-semibold rounded-btn-lg shadow-btn-shadow hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Book a Demo
      </motion.button>
    </section>
  );
};

const Accordion: React.FC<AccordionProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
    >
      <h2 className="text-lg font-semibold text-textPrimary flex justify-between items-center">
        {question}
        <span className="text-primary">{isOpen ? "-" : "+"}</span>
      </h2>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-2 text-textSecondary"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Faqs;
