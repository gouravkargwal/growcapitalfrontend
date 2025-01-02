"use client";

import { FaBell, FaSearch } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai"; // Hamburger icon
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { globalEnums } from "@/enum";

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

interface PrivateNavbarProps {
  toggleSidebar: () => void;
}

const PrivateNavbar: React.FC<PrivateNavbarProps> = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideClick(notificationRef, () => setIsNotificationOpen(false));

  const getTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Home";
      case "/timeline":
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
        return globalEnums.brandName;
    }
  };

  return (
    <nav className="bg-gradient-to-b from-[#FDF8F1] via-[#FDF8F1] to-white p-4 flex flex-col relative w-screen sm:w-full">
      <div className="flex justify-between items-center">
        <div className="text-gray-600 text-2xl mr-4">
          <div className="flex flex-row">
            <button
              className="lg:hidden text-2xl focus:outline-none"
              onClick={toggleSidebar}
            >
              <AiOutlineMenu />
            </button>
            <span
              className={`text-2xl text-gray-600 ${pathname === "/dashboard" ? "hidden lg:block" : "block"
                } ml-4 md:ml-0`}
            >
              {getTitle(pathname) || "Home"}
            </span>
          </div>
        </div>
        {pathname === "/dashboard" && (
          <div className="flex space-x-4 mr-5 items-center justify-center">
            <div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:hover:bg-accent focus:outline-none"
                onClick={() => setIsTutorialOpen(true)}
              >
                Watch Tutorial
              </button>
              {isTutorialOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                  onClick={() => setIsTutorialOpen(false)}
                >
                  <div
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 flex justify-end">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setIsTutorialOpen(false)}
                      >
                        &times;
                      </button>
                    </div>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/BILM01l3PJo?si=Kpf78rK1JzSPjmyK"
                      title="Informe Tutorial"
                      color="primary"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="relative"
                onMouseEnter={() => setIsNotificationOpen(true)}
              >
                <FaBell className="text-gray-600 text-2xl" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
              </button>
              {isNotificationOpen && (
                <div
                  ref={notificationRef}
                  className="absolute right-0 mt-4 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-64 max-w-xs z-50"
                >
                  <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                  <ul className="text-gray-600">
                    <li className="mb-2">Nothing Here</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PrivateNavbar;
