import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-4 leading-tight sm:text-4xl md:text-7xl">
          The #1 Trade Copier for{" "}
          <span className="text-blue-600">MetaTrader</span> &{" "}
          <span className="text-blue-600">Telegram</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-6 sm:text-base md:text-lg">
          Lightning Fast Execution. Join Thousands of Traders Globally. No VPS
          Needed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-x-4 sm:space-y-0">
          <a
            href="#"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Join Waitlist
          </a>
          <a
            href="#"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Join Community
          </a>
        </div>

        {/* Features */}
        <div className="mt-6 flex flex-col justify-center items-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0 text-xs sm:text-sm text-gray-500">
          <p>⚡ Lightning Fast Execution</p>
          <p>🌍 Join Thousands of Traders Globally</p>
          <p>🚫 No VPS Needed</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
