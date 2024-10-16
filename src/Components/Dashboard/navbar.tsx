"use client";

import { auth } from "@/lib/firebase";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaMicrophone, FaBell, FaPlay } from "react-icons/fa";

// Custom Hook to detect clicks outside the component
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

const Navbar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  useOutsideClick(notificationRef, () => setIsNotificationOpen(false));
  useOutsideClick(examplesRef, () => setIsExamplesOpen(false));

  return (
    <nav className="bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col relative w-screen sm:w-full">
      <div>
        <div className="flex space-x-4 justify-between">
          <div className="text-gray-600 text-2xl mr-4">Home</div>
          <div className="flex flex-row">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search for stocks..."
                className="bg-gray-100 pl-10 pr-10 py-2 rounded-full focus:outline-none border border-gray-300"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-500" />
              <FaMicrophone className="absolute top-3 right-3 text-gray-500" />
            </div>

            {/* Notifications Button */}
            <button
              className="relative mr-4"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <FaBell className="text-gray-600 text-2xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div
                ref={notificationRef}
                className="absolute right-10 mt-2 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-64 z-50"
              >
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                <ul className="text-gray-600">
                  <li className="mb-2">Stock XYZ has risen by 5%</li>
                  <li className="mb-2">Your order was executed</li>
                  <li className="mb-2">Stock ABC has dropped by 3%</li>
                </ul>
              </div>
            )}

            {/* Examples Button */}
            <button
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setIsExamplesOpen(!isExamplesOpen)}
            >
              <FaPlay className="mr-2" />
              See Examples
            </button>

            {/* Examples Dropdown */}
            {isExamplesOpen && (
              <div
                ref={examplesRef}
                className="absolute right-16 mt-2 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-64 z-50"
              >
                <h3 className="font-semibold text-lg mb-2">
                  Example Portfolios
                </h3>
                <ul className="text-gray-600">
                  <li className="mb-2">Growth Portfolio</li>
                  <li className="mb-2">Dividend Portfolio</li>
                  <li className="mb-2">Tech Portfolio</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 mb-2">
        <h1 className="text-3xl font-semibold">
          Hello {auth?.currentUser?.displayName?.split(" ")[0] || ""}!
        </h1>
        <p className="text-gray-500">Easily build your dream portfolio!</p>
      </div>
    </nav>
  );
};

export default Navbar;
