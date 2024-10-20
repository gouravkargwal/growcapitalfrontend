import React, { useState } from "react";

import { motion } from "framer-motion";

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
    hover: { scale: 1.08, zIndex: 1, transition: { duration: 0.2 } },
    highlighted: { scale: 1.1, zIndex: 2, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-neutral text-primary min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Simple and Flexible Pricing
        </h1>

        {/* Billing toggle switch */}
        <div className="flex justify-center items-center mb-8">
          <span
            className={`mr-2 ${isMonthly ? "text-gray-700" : "text-gray-400"}`}
          >
            Monthly
          </span>
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
          <span
            className={`ml-2 ${!isMonthly ? "text-gray-700" : "text-gray-400"}`}
          >
            Annually
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan ($99 or $999/year) */}
          <motion.div
            className={`bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg p-6 shadow-lg ${
              highlighted === "basic" ? "scale-105 bg-primary text-white" : ""
            }`}
            variants={pricingvarient}
            initial="initial"
            animate={highlighted === "basic" ? "highlighted" : "initial"}
            whileHover="hover"
            onMouseEnter={() => setHighlighted("basic")}
            onMouseLeave={() => highlighted !== "pro" && setHighlighted("pro")}
          >
            <h2 className="text-xl font-bold">Basic</h2>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? "$99" : "$999"}{" "}
              <span className="text-sm">
                per {isMonthly ? "month" : "year"}
              </span>
            </p>
            <p
              className={`${
                highlighted ? "text-gray-800" : "text-gray-500"
              } mb-4 transition duration-300`}
            >
              Ideal for individuals tracking a limited number of stocks.
            </p>
            <ul className="space-y-2">
              <li>Up to 10 stocks</li>
              <li>Telegram updates only</li>
              <li>Tweet News</li>
              <li>BSE News</li>
            </ul>
            <button
              className={`mt-6 ${
                highlighted === "basic" ? "bg-white text-primary" : "bg-accent"
              } hover:bg-white hover:text-primary py-2 px-4 rounded-lg w-full transition duration-300`}
            >
              Get Started
            </button>
          </motion.div>

          {/* Pro Plan ($299 or $2999/year) */}
          <motion.div
            className={`${
              highlighted === "pro"
                ? "scale-105 bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            } hover:bg-primary hover:text-white transition-all duration-300 rounded-lg p-6 shadow-lg`}
            variants={pricingvarient}
            initial="initial"
            animate={highlighted === "pro" ? "highlighted" : "initial"}
            whileHover="hover"
            onMouseEnter={() => setHighlighted("pro")}
            onMouseLeave={() => setHighlighted("pro")}
          >
            <h2 className="text-xl font-bold">Pro</h2>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? "$299" : "$2999"}{" "}
              <span className="text-sm">
                per {isMonthly ? "month" : "year"}
              </span>
            </p>
            <p
              className={`${
                highlighted ? "text-gray-800" : "text-gray-500"
              } mb-4 transition duration-300`}
            >
              Perfect for teams or individuals with a larger stock portfolio.
            </p>
            <ul className="space-y-2">
              <li>Up to 50 stocks</li>
              <li>Telegram updates only</li>
              <li>Tweet News</li>
              <li>BSE News</li>
            </ul>
            <button
              className={`mt-6 ${
                highlighted === "pro" ? "bg-white text-primary" : "bg-accent"
              } hover:bg-white hover:text-primary py-2 px-4 rounded-lg w-full transition duration-300`}
            >
              Get Started
            </button>
          </motion.div>

          {/* Premium Plan ($499 or $4999/year) */}
          <motion.div
            className={`bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg p-6 shadow-lg ${
              highlighted === "premium" ? "scale-105 bg-primary text-white" : ""
            }`}
            variants={pricingvarient}
            initial="initial"
            animate={highlighted === "premium" ? "highlighted" : "initial"}
            whileHover="hover"
            onMouseEnter={() => setHighlighted("premium")}
            onMouseLeave={() => highlighted !== "pro" && setHighlighted("pro")}
          >
            <h2 className="text-xl font-bold">Premium</h2>
            <p className="text-2xl font-bold mb-4">
              {isMonthly ? "$499" : "$4999"}{" "}
              <span className="text-sm">
                per {isMonthly ? "month" : "year"}
              </span>
            </p>
            <p
              className={`${
                highlighted ? "text-gray-800" : "text-gray-500"
              } mb-4 transition duration-300`}
            >
              Comprehensive plan for professionals tracking extensive stocks
              with advanced features.
            </p>
            <ul className="space-y-2">
              <li>Up to 1000 stocks</li>
              <li>Telegram & WhatsApp updates</li>
              <li>Tweet News</li>
              <li>BSE News</li>
              <li>Prediction and News Score</li> {/* Only in the $499 plan */}
            </ul>
            <button
              className={`mt-6 ${
                highlighted === "premium"
                  ? "bg-white text-primary"
                  : "bg-accent"
              } hover:bg-white hover:text-primary py-2 px-4 rounded-lg w-full transition duration-300`}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
