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
      title: "Project Management",
      description:
        "Manage your projects from start to finish. With all your projects in Ganttify, you’ll always know who’s doing what, by when.",
      icon: "📋",
      direction: "left",
    },
    {
      title: "Workflows and Automations",
      description:
        "Create more efficient processes so you can seamlessly manage projects across departments and get more done in less time.",
      icon: "🔗",
      direction: "right",
    },
    {
      title: "Goals and Reporting",
      description:
        "See how each project and portfolio ladders up to company objectives and keep everyone focused on the work that matters.",
      icon: "🎯",
      direction: "left",
    },
    {
      title: "Resource Management",
      description:
        "Get the visibility you need to plan accurate timelines, adjust workloads, and stay on track to achieve your objectives.",
      icon: "📦",
      direction: "right",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
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
