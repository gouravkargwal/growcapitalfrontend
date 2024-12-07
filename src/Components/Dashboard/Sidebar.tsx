"use client";

import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { IoMdHelpCircleOutline } from "react-icons/io";
import React from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../../assets/logo-1.png";
import { helpCenterClicked, homeClicked, logoutClicked, profileClicked, referClicked, subscriptionClicked, timelineClicked } from "@/events/common/sidebar-events";
import { logEvent, logout } from "@/events/analytics";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const home = homeClicked();
  const timeline = timelineClicked();
  const refer = referClicked();
  const subscription = subscriptionClicked();
  const profile = profileClicked();
  const helpCenter = helpCenterClicked();
  const logoutclicked = logoutClicked();
  // Check if the current route matches the given route path
  const isActive = (routePath: string) => pathname === routePath;

  const goToPage = (routePath: string) => {
    router.push(routePath);
    closeSidebar();
  };

  return (
    <div className="w-full h-screen p-4 bg-[#F8F4F1] flex flex-col justify-between rounded-tr-2xl rounded-br-2xl shadow-lg">
      <div>
        <Image src={logo} alt="Informe" height={45} className="mb-8" />
        <ul className="space-y-4 mt-10">
          <li>
            <button
              className={`w-full text-left p-3 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/dashboard")
                ? "bg-primary text-white shadow-md"
                : "hover:bg-gray-200"
                } `}
              onClick={() => { goToPage("/dashboard"); logEvent(home); }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-3 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/timeline")
                ? "bg-primary text-white shadow-md"
                : "hover:bg-gray-200"
                } `}
              onClick={() => { goToPage("/timeline"); logEvent(timeline); }}
            >
              Your Timeline
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-3 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/referAndEarn")
                ? "bg-primary text-white shadow-md"
                : "hover:bg-gray-200"
                } `}
              onClick={() => { goToPage("/referAndEarn"); logEvent(refer); }}
            >
              Refer And Earn
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-3 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/subscriptions")
                ? "bg-primary text-white shadow-md"
                : "hover:bg-gray-200"
                } `}
              onClick={() => { goToPage("/subscriptions"), logEvent(subscription); }}
            >
              Subscriptions
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-3 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/profileSettings")
                ? "bg-primary text-white shadow-md"
                : "hover:bg-gray-200"
                } `}
              onClick={() => { goToPage("/profileSettings"), logEvent(profile); }}
            >
              Profile Settings
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <ul className="space-y-4">
          <li>
            <button
              className="w-full text-left p-3 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out flex gap-3 items-center"
              onClick={() => {
                window.open(`https://informe.freshdesk.com`, "_blank")
                logEvent(helpCenter);
              }
              }
            >
              <IoMdHelpCircleOutline className="text-xl" />
              Help Center
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-3 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out flex gap-3 items-center"
              onClick={() => {
                signOut(auth);
                closeSidebar();
                logEvent(logoutclicked);
                logout();
              }}
            >
              <CiLogout className="text-xl" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
