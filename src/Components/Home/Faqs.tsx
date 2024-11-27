import React, { useState } from "react";

import { motion } from "framer-motion";

interface AccordionProps {
  question: string;
}

const Faqs: React.FC = () => {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 60,
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
    <section
      className="flex flex-col md:flex-row lg:flex-row justify-center items-center px-6 lg:px-16 pb-40"
      id="faqs"
    >
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        className="text-center md:text-start"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h1 className="text-3xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight text-center md:text-start">
          Your Stock News Questions, Answered
        </h1>
        <p className="text-textSecondary text-lg text-start mb-4 md:mb-0">
          Have questions about how we help you stay informed with real-time
          stock news? We’ve got answers!
        </p>
        <motion.button
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          className="hidden md:flex mt-5 px-8 py-4 bg-primary text-white font-semibold rounded-btn-lg shadow-btn-shadow hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => window.open("https://informe.freshdesk.com", "_blank")}
        >
          Contact Us
        </motion.button>
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        className="w-full max-w-3xl space-y-4"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Accordion question="What type of stock news do you provide?" />
        <Accordion question="How often do you update the stock news?" />
        <Accordion question="Can I customize the types of stocks I want updates for?" />
        <Accordion question="Do I need to use Telegram to receive stock news?" />
        <Accordion question="How do I manage my stock news alerts?" />
      </motion.div>
      <motion.button
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        className="flex md:hidden mt-5 px-8 py-4 bg-primary text-white font-semibold rounded-btn-lg shadow-btn-shadow hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => window.open("https://informe.freshdesk.com", "_blank")}
      >
        Contact Us
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
            {question === "What type of stock news do you provide?" && (
              <span>
                We provide real-time stock news summaries, focusing on key
                market movements, significant company updates, and relevant
                financial events. Our summaries are concise (100 words),
                ensuring you get the most important details quickly.
              </span>
            )}

            {question === "How often do you update the stock news?" && (
              <span>
                Our stock news updates are delivered in real-time, ensuring
                you’re always up-to-date with the latest market movements and
                developments.
              </span>
            )}

            {question ===
              "Can I customize the types of stocks I want updates for?" && (
              <span>
                Yes, you can customize the stocks you want to follow, ensuring
                you get relevant updates tailored to your portfolio or
                interests.
              </span>
            )}

            {question ===
              "Do I need to use Telegram to receive stock news?" && (
              <span>
                Telegram is one of our primary channels for delivering stock
                news. However, if you're on the Pro or Premium plans, you can
                also receive updates via WhatsApp, making it easier to stay
                informed across different platforms.
              </span>
            )}

            {question === "How do I manage my stock news alerts?" && (
              <span>
                You can easily manage your alerts through your account settings.
                You can adjust the frequency, choose specific stocks, and toggle
                between platforms (Telegram or WhatsApp) to receive
                notifications.
              </span>
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Faqs;
