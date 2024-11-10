import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      image: "https://randomuser.me/api/portraits/men/40.jpg", // Real person photo
      rating: 4.8,
      testimonial:
        "GrowCapital has completely transformed the way I receive stock news. The summaries are concise and the sentiment scores provide valuable insights that help me make quicker investment decisions.",
    },
    {
      id: 2,
      name: "Neha Gupta",
      role: "Investment Manager, Capital Dynamics",
      image: "https://randomuser.me/api/portraits/women/50.jpg", // Real person photo
      rating: 4.9,
      testimonial:
        "The stock news updates from GrowCapital are incredibly helpful. I get the latest news with sentiment analysis straight to my phone, making it easier to monitor the market and act quickly.",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Portfolio Manager, Growth Investments",
      image: "https://randomuser.me/api/portraits/men/60.jpg", // Real person photo
      rating: 4.7,
      testimonial:
        "As a portfolio manager, GrowCapital has been a game-changer. I get a quick summary of stock news along with sentiment scores that help me gauge market sentiment before making any moves.",
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Stock Analyst, Market Experts",
      image: "https://randomuser.me/api/portraits/women/60.jpg", // Real person photo
      rating: 5.0,
      testimonial:
        "GrowCapital’s ability to send personalized stock news directly to my Telegram is incredibly useful. The sentiment score feature helps me stay on top of market trends and adjust my strategy accordingly.",
    },
    {
      id: 5,
      name: "Ravi Singh",
      role: "Risk Analyst, Future Finance",
      image: "https://randomuser.me/api/portraits/men/30.jpg", // Real person photo
      rating: 4.6,
      testimonial:
        "With GrowCapital, I receive not only stock news but also insights into how the market is reacting to those events. The sentiment score feature is a real-time indicator that helps me gauge market movements effectively.",
    },
    {
      id: 6,
      name: "Sanya Mehta",
      role: "Investment Strategist, Visionary Traders",
      image: "https://randomuser.me/api/portraits/women/70.jpg", // Real person photo
      rating: 4.8,
      testimonial:
        "GrowCapital has streamlined my approach to keeping up with the market. The stock news summaries and sentiment scores keep me informed and ready to make data-driven decisions quickly.",
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
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          What Our Customers Are Saying About GrowCapital
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Here's how GrowCapital is helping investors make smarter decisions
          with stock news and sentiment analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% is visible
              variants={cardVariants}
              className="bg-white shadow-lg rounded-lg p-8 transition-all transform hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <div className="flex-grow">
                {/* Star ratings */}
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(testimonial.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.432 4.399a1 1 0 00.95.69h4.588c.969 0 1.371 1.24.588 1.81l-3.708 2.698a1 1 0 00-.364 1.118l1.432 4.399c.3.921-.755 1.688-1.54 1.118l-3.708-2.698a1 1 0 00-1.175 0l-3.708 2.698c-.784.57-1.838-.197-1.539-1.118l1.432-4.399a1 1 000-.364-1.118L2.049 9.826c-.784-.57-.38-1.81.588-1.81h4.588a1 1 0 00.95-.69l1.432-4.399z"></path>
                    </svg>
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
