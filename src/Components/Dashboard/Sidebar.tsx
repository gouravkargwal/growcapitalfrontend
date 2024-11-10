"use client";

import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { IoMdHelpCircleOutline } from "react-icons/io";
import React from "react";
import { auth } from "@/lib/firebase";
import avatar from "../../../assets/avatar.jpg";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current route matches the given route path
  const isActive = (routePath: string) => pathname === routePath;

  const goToPage = (routePath: string) => {
    router.push(routePath);
    closeSidebar();
  };

  return (
    <div className="w-full h-screen p-4 bg-white flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Grow Capital</h1>
        <div className="flex items-center mb-6">
          <Image
            src={auth?.currentUser?.photoURL || avatar}
            alt="profile"
            className="w-10 h-10 rounded-full mr-2"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold truncate">
              {auth?.currentUser?.displayName}
            </h2>
            <p className="text-sm text-gray-400 truncate max-w-[150px] md:max-w-[200px]">
              {auth?.currentUser?.email}
            </p>
          </div>
        </div>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/dashboard")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
              onClick={() => goToPage("/dashboard")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/yourtimeline")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
              onClick={() => goToPage("/yourtimeline")}
            >
              Your Timeline
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/referAndEarn")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
              onClick={() => goToPage("/referAndEarn")}
            >
              Refer And Earn
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/subscriptions")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
              onClick={() => goToPage("/subscriptions")}
            >
              Subscriptions
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/profileSettings")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
              onClick={() => goToPage("/profileSettings")}
            >
              Profile Settings
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${isActive("/providers")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
              onClick={() => goToPage("/providers")}
            >
              Notification Provider Config
            </button>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="space-y-2">
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out flex gap-2 items-center"
              onClick={() => window.open("https://growcapital.freshdesk.com", "_blank")}
            >
              <IoMdHelpCircleOutline />
              Help Center
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out flex gap-2 items-center"
              onClick={() => {
                signOut(auth);
                closeSidebar();
              }}
            >
              <CiLogout />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
