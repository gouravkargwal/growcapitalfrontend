import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaTelegramPlane } from "react-icons/fa";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="h-[100vh] flex items-center justify-center relative overflow-hidden pt-hero-padding sm:pt-20 md:pt-hero-padding">
      <div className="text-center max-w-4xl px-4 relative z-10">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-blue-800 mb-4 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Stay Ahead with{" "}
          <span className="text-blue-800">Real-Time Stock News</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-textSecondary mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🌐 Stay ahead with real-time BSE updates! 100-word summaries 🗣️,
          add/remove stocks, stay informed! 📲
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-x-6 sm:space-y-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            className="px-8 py-4 sm:px-10 sm:py-4 bg-primary text-white rounded-btn-lg font-semibold shadow-btn-shadow hover:bg-accent transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              router.push("signup");
            }}
          >
            Get Started
          </button>

          <button
            className="flex items-center px-8 py-4 sm:px-10 sm:py-4 border-2 border-primary text-primary rounded-btn-lg font-semibold shadow-btn-shadow hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              router.push("signup");
            }}
          >
            <FaTelegramPlane className="mr-2" />
            Join With Bot
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-6 sm:mt-10 flex flex-col justify-center items-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0 text-xs sm:text-sm md:text-base text-textSecondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p>⚡ Real-Time Updates</p>
          <p>📊 Sentimental Scores</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
