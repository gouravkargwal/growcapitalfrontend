import React, { useState } from "react";
import { motion } from "framer-motion";
import ComparePlans from "./features";

const PricingSection: React.FC = () => {
  // State for switching between Monthly and Annually
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  // State for the highlighted plan (default: 'pro')
  const [highlighted, setHighlighted] = useState<string>("pro");

  // Toggle the billing type between Monthly and Annually
  const toggleBilling = () => {
    setIsMonthly(!isMonthly);
  };

  // Variants for motion animations
  const pricingvarient = {
    initial: { scale: 1, zIndex: 0 },
    hover: { scale: 1.08, zIndex: 1, transition: { duration: 0.1 } },
    highlighted: { scale: 1.08, zIndex: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white text-black flex justify-center items-center">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-center mb-10">
          Simple and Flexible Pricing
        </h1>

        <div className="flex justify-center items-center mb-6">
          <span className="mr-2">Monthly</span>
          <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ease-in-out transform translate-x-0 checked:translate-x-6"
              checked={!isMonthly}
              onChange={toggleBilling}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <span className="ml-2">Annually</span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Plan */}
          <motion.div
            className={`bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-lg p-6 ${
              highlighted === "personal" ? "scale-105 bg-white text-black" : ""
            }`}
            variants={pricingvarient}
            initial="initial"
            animate={highlighted === "personal" ? "highlighted" : "initial"}
            whileHover="hover"
            onMouseEnter={() => setHighlighted("personal")}
            onMouseLeave={() => setHighlighted("pro")}
          >
            <h2 className="text-xl font-bold">Personal</h2>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? "$29" : "$290"}{" "}
              <span className="text-sm">per month</span>
            </p>
            <p className="text-gray-400 hover:text-white mb-4 transition duration-300">
              For individuals and small teams looking to manage their tasks
            </p>
            <ul className="space-y-2">
              <li>Unlimited contacts</li>
              <li>Bulk emailing</li>
              <li>AI Integration</li>
              <li>View & share up to 3 years</li>
              <li>Collaboration & permissions</li>
            </ul>
            <button className="mt-6 bg-black hover:bg-white text-white hover:text-white py-2 px-4 rounded-lg w-full transition duration-300">
              Get Started
            </button>
          </motion.div>

          {/* Pro Plan - highlighted by default */}
          <motion.div
            className={`bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-lg p-6 ${
              highlighted === "pro" ? "scale-105 bg-white text-black" : ""
            }`}
            variants={pricingvarient}
            initial="initial"
            animate={highlighted === "pro" ? "highlighted" : "initial"}
            whileHover="hover"
            onMouseEnter={() => setHighlighted("pro")}
          >
            <h2 className="text-xl font-bold">Pro</h2>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? "$39" : "$390"}{" "}
              <span className="text-sm">per month</span>
            </p>
            <p className="text-gray-400 hover:text-white mb-4 transition duration-300">
              For growing teams that need to track their projects and hit
              deadlines
            </p>
            <ul className="space-y-2">
              <li>Email sequences</li>
              <li>Send emails from multiple domains</li>
              <li>Connect multiple email accounts</li>
              <li>Fully adjustable sharing permissions</li>
              <li>Migration services</li>
            </ul>
            <button className="mt-6 bg-black hover:bg-white text-white hover:text-white py-2 px-4 rounded-lg w-full transition duration-300">
              Get Started
            </button>
          </motion.div>

          {/* Custom Plan */}
          <motion.div
            className={`bg-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg p-6 ${
              highlighted === "custom" ? "scale-105 bg-white text-black" : ""
            }`}
            variants={pricingvarient}
            initial="initial"
            animate={highlighted === "custom" ? "highlighted" : "initial"}
            whileHover="hover"
            onMouseEnter={() => setHighlighted("custom")}
            onMouseLeave={() => setHighlighted("pro")}
          >
            <h2 className="text-xl font-bold">Custom Plan</h2>
            <p className="text-2xl font-bold mb-4">Custom Pricing</p>
            <p className="text-gray-400 hover:text-white mb-4 transition duration-300">
              For companies that need to manage a portfolio of work and goals
            </p>
            <ul className="space-y-2">
              <li>White glove onboarding</li>
              <li>Custom billing</li>
              <li>Dedicated slack channel</li>
              <li>Dedicated point of contact</li>
              <li>Unlimited reporting</li>
            </ul>
            <button className="mt-6 bg-black hover:bg-white text-white hover:text-white py-2 px-4 rounded-lg w-full transition duration-300">
              Get Started
            </button>
          </motion.div>
        </div>
        <ComparePlans />
      </div>
    </div>
  );
};

export default PricingSection;
