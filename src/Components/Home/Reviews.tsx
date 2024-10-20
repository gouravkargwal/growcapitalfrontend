import React from "react";
import { motion } from "framer-motion";

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
      name: "Charolette Hanlin",
      role: "Co-Founder, Heroes Digital",
      image: "https://via.placeholder.com/40",
      rating: 4.8,
      testimonial:
        "Ganttify has revolutionized the way we manage our projects. Connecting tasks and workflows to our overall company goals has never been easier.",
    },
    {
      id: 2,
      name: "Eleanor Pena",
      role: "Co-Founder, Heroes Digital",
      image: "https://via.placeholder.com/40",
      rating: 4.8,
      testimonial:
        "Using Ganttify has streamlined our project management process. It’s incredibly effective in aligning our daily tasks with the company’s strategic goals.",
    },
    {
      id: 3,
      name: "Guy Hawkins",
      role: "Co-Founder, Heroes Digital",
      image: "https://via.placeholder.com/40",
      rating: 4.8,
      testimonial:
        "Ganttify has provided us with a unified view of our projects. It connects our workflows directly to our business goals, making it easier to track progress.",
    },
    {
      id: 4,
      name: "Kristin Watson",
      role: "Co-Founder, Heroes Digital",
      image: "https://via.placeholder.com/40",
      rating: 4.8,
      testimonial:
        "Ganttify’s ability to connect tasks with our company’s goals has given us a new level of clarity and efficiency in our project management efforts.",
    },
    {
      id: 5,
      name: "Jane Cooper",
      role: "Co-Founder, Heroes Digital",
      image: "https://via.placeholder.com/40",
      rating: 4.8,
      testimonial:
        "Using Ganttify, we’ve been able to ensure that all our project activities are aligned with our overarching business objectives, leading to better coordination and success.",
    },
    {
      id: 6,
      name: "Leslie Alexander",
      role: "Co-Founder, Heroes Digital",
      image: "https://via.placeholder.com/40",
      rating: 4.8,
      testimonial:
        "Ganttify has transformed our approach to project management. It ensures that every task, no matter how small, is aligned with our company’s mission and goals.",
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
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          What Our Customers Are Saying
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Here's what some of our customers think about our platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% is visible
              variants={cardVariants}
              className="bg-white shadow-lg rounded-lg p-8 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                {/* Star ratings */}
                <div className="flex space-x-1">
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
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.432 4.399a1 1 0 00.95.69h4.588c.969 0 1.371 1.24.588 1.81l-3.708 2.698a1 1 0 00-.364 1.118l1.432 4.399c.3.921-.755 1.688-1.54 1.118l-3.708-2.698a1 1 0 00-1.175 0l-3.708 2.698c-.784.57-1.838-.197-1.539-1.118l1.432-4.399a1 1 0 00-.364-1.118L2.049 9.826c-.784-.57-.38-1.81.588-1.81h4.588a1 1 0 00.95-.69l1.432-4.399z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-700 font-semibold">
                  {testimonial.rating}
                </span>
              </div>
              <p className="text-gray-600 italic mb-4">
                "{testimonial.testimonial}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
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
