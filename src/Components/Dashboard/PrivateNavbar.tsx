"use client";

import { FaBell, FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

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

const PrivateNavbar: React.FC<{ toggleSidebar: () => void }> = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideClick(notificationRef, () => setIsNotificationOpen(false));

  // Map pathname to the title
  const getTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Home";
      case "/yourtimeline":
        return "Your Timeline";
      case "/referAndEarn":
        return "Refer And Earn";
      case "/subscriptions":
        return "Subscriptions";
      case "/profileSettings":
        return "Profile Settings";
      case "/providers":
        return "Notification Provider Config";
      default:
        return "Grow Capital";
    }
  };

  return (
    <nav className="bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col relative w-screen sm:w-full">
      <div className="flex justify-between items-center">
        {/* Display the title based on the current route */}
        <div className="text-gray-600 text-2xl mr-4">{getTitle(pathname)}</div>

        {/* Search Bar and other elements */}
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for stocks..."
              className="bg-gray-100 pl-10 pr-10 py-2 rounded-full focus:outline-none border border-gray-300"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500" />
          </div>

          {/* Notifications Button */}
          <button
            className="relative"
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
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
