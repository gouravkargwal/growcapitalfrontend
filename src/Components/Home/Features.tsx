import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CardProps {
  title: string;
  description: string;
  icon: string;
  direction: "left" | "right"; // determines animation direction
}

const Features: React.FC = () => {
  const cardData: CardProps[] = [
    {
      title: "Stock News Summaries",
      description:
        "Get the latest stock news delivered directly to your messaging app of choice, summarized so you can stay informed with minimal time investment.",
      icon: "📰",
      direction: "left",
    },
    {
      title: "Sentiment Analysis",
      description:
        "Receive sentiment scores alongside news summaries, helping you gauge the market's mood and make informed decisions.",
      icon: "📈",
      direction: "right",
    },
    {
      title: "Telegram & WhatsApp Support",
      description:
        "Choose your preferred messaging platform—Telegram or WhatsApp—to receive updates, giving you flexibility and convenience.",
      icon: "💬",
      direction: "left",
    },
    {
      title: "Customizable Alerts",
      description:
        "Set up alerts based on your favorite stocks and news types, ensuring you only receive the information you want.",
      icon: "🔔",
      direction: "right",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Key Features of GrowCapital
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Discover how GrowCapital’s powerful features help you stay informed,
          make smarter investment decisions, and manage your portfolio with
          ease.
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
    threshold: 0.5, // Animation triggers when 50% visible
  });

  const variants = {
    hidden: { opacity: 0, x: direction === "left" ? -150 : 150 },
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
