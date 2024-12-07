import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { claimTrialClicked } from "@/events/home/home-events";
import { logEvent } from "@/events/analytics";

const Trial: React.FC = () => {
  const router = useRouter();
  const trial = claimTrialClicked();
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
    <section className="text-center py-20 lg:py-40">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={containerVarient}
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-3xl mx-auto px-4"
      >
        <motion.h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight">
          Start Your Journey Today. <br /> Enjoy 90 Days Free Access!
        </motion.h2>

        <motion.p className="text-textSecondary text-body-lg leading-relaxed mb-10">
          🚀 Stay ahead of the market with real-time BSE updates! Get concise
          100-word stock news summaries 📰, easily add or remove stocks, and
          stay informed on-the-go. 📱
        </motion.p>

        <motion.button
          className="bg-primary hover:bg-accent text-white font-semibold py-4 px-8 rounded-btn-lg shadow-btn-shadow transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            router.push("signup");
            logEvent(trial);
          }}
        >
          Claim Your Free Trial
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Trial;
