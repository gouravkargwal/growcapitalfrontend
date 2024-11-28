import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaNewspaper, FaChartLine, FaCommentAlt, FaBell } from "react-icons/fa"; // Importing necessary icons
import { globalEnums } from "@/enum";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Change the type to ReactNode to accept React Icons
  direction: "left" | "right";
}

const Features: React.FC = () => {
  const cardData: CardProps[] = [
    {
      title: "Stock News Summaries",
      description:
        "Get the latest stock news delivered directly to your messaging app of choice, summarized so you can stay informed with minimal time investment.",
      icon: <FaNewspaper size={40} className="text-primary" />, // Use React Icon here
      direction: "left",
    },
    {
      title: "Sentiment Analysis",
      description:
        "Receive sentiment scores alongside news summaries, helping you gauge the market's mood and make informed decisions.",
      icon: <FaChartLine size={40} className="text-primary" />, // Use React Icon here
      direction: "right",
    },
    {
      title: "Telegram & WhatsApp Support",
      description:
        "Choose your preferred messaging platform—Telegram or WhatsApp—to receive updates, giving you flexibility and convenience.",
      icon: <FaCommentAlt size={40} className="text-primary" />, // Use React Icon here
      direction: "left",
    },
    {
      title: "Customizable Alerts",
      description:
        "Set up alerts based on your favorite stocks and news types, ensuring you only receive the information you want.",
      icon: <FaBell size={40} className="text-primary" />, // Use React Icon here
      direction: "right",
    },
  ];

  return (
    <section
      className="py-16 lg:min-h-screen overflow-x-hidden bg-white"
      id="features"
    >
      <div className="mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
          {globalEnums.brandName} Features
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Discover how {globalEnums.brandName}’s powerful features help you stay
          informed, make smarter investment decisions, and manage your portfolio
          with ease.
        </p>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 lg:gap-16">
          {cardData.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              direction={card.direction}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  direction,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-start"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Features;
