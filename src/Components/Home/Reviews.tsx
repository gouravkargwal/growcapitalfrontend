import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { globalEnums } from "@/enum";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  testimonial: string;
}

const Reviews: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Amit Sharma",
      role: "Financial Analyst, Wealth Corp",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      rating: 4,
      testimonial: `${globalEnums.brandName} has completely transformed the way I receive stock news. The summaries are concise and the sentiment scores provide valuable insights that help me make quicker investment decisions.`,
    },
    {
      id: 2,
      name: "Neha Gupta",
      role: "Investment Manager, Capital Dynamics",
      image: "https://randomuser.me/api/portraits/women/84.jpg",
      rating: 4.9,
      testimonial: `The stock news updates from ${globalEnums.brandName} are incredibly helpful. I get the latest news with sentiment analysis straight to my phone, making it easier to monitor the market and act quickly.`,
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Portfolio Manager, Growth Investments",
      image: "https://randomuser.me/api/portraits/men/39.jpg",
      rating: 4,
      testimonial: `As a portfolio manager, ${globalEnums.brandName} has been a game-changer. I get a quick summary of stock news along with sentiment scores that help me gauge market sentiment before making any moves.`,
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Stock Analyst, Market Experts",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
      rating: 4.0,
      testimonial: `${globalEnums.brandName}’s ability to send personalized stock news directly to my Telegram is incredibly useful. The sentiment score feature helps me stay on top of market trends and adjust my strategy accordingly.`,
    },
    {
      id: 5,
      name: "Ravi Singh",
      role: "Risk Analyst, Future Finance",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 4.9,
      testimonial: `With ${globalEnums.brandName}, I receive not only stock news but also insights into how the market is reacting to those events. The sentiment score feature is a real-time indicator that helps me gauge market movements effectively.`,
    },
    {
      id: 6,
      name: "Atul Mehta",
      role: "Investment Strategist, Visionary Traders",
      image: "https://randomuser.me/api/portraits/men/69.jpg",
      rating: 4.8,
      testimonial: `${globalEnums.brandName} has streamlined my approach to keeping up with the market. The stock news summaries and sentiment scores keep me informed and ready to make data-driven decisions quickly.`,
    },
  ];

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
    <section className="py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
          What Our Customers Are Saying About {globalEnums.brandName}
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Here's how {globalEnums.brandName} is helping investors make smarter
          decisions with stock news and sentiment analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              className="bg-white shadow-lg rounded-lg p-8 transition-all transform hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(testimonial.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.testimonial}"
                </p>
              </div>
              <div className="flex items-center mt-auto">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
