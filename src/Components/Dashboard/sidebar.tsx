"use client";

import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { IoMdHelpCircleOutline } from "react-icons/io";
import React from "react";
import { auth } from "@/lib/firebase";
import avatar from "../../../assets/avatar.jpg";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Sidebar = ({
  closeSidebar,
  onTabSelect,
  selectedTab,
}: {
  closeSidebar: () => void;
  onTabSelect: (tab: string) => void;
  selectedTab: string; // New prop for the selected tab
}) => {
  const router = useRouter();

  // Helper function to check if a tab is active
  const isActive = (tabName: string) => selectedTab === tabName;

  const goToDashboard = () => {
    onTabSelect("Home"); // Pass the tab name when a tab is clicked
    router.push("/dashboard");
    closeSidebar();
  };

  const goToReferAndEarn = () => {
    onTabSelect("Refer And Earn");
    router.push("/referAndEarn");
    closeSidebar();
  };

  const goToSubscription = () => {
    onTabSelect("Subscriptions");
    router.push("/subscriptions");
    closeSidebar();
  };

  const goToYourtimeline = () => {
    onTabSelect("Your Timeline");
    router.push("/yourtimeline");
    closeSidebar();
  };

  const goToProfileSettings = () => {
    onTabSelect("Profile Settings");
    router.push("/profileSettings");
    closeSidebar();
  };

  const goToProviders = () => {
    onTabSelect("Notification Provider Config");
    router.push("/providers");
    closeSidebar();
  };

  const goToStocksTracked = () => {
    onTabSelect("Stocks Tracked");
    router.push("/addStocks");
    closeSidebar();
  };

  return (
    <div className="w-full h-full p-4 bg-white">
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
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Home") ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={goToDashboard}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Your Timeline")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={goToYourtimeline}
          >
            Your Timeline
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Refer And Earn")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={goToReferAndEarn}
          >
            Refer And Earn
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Subscriptions")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={goToSubscription}
          >
            Subscriptions
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Profile Settings")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={goToProfileSettings}
          >
            Profile Settings
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Notification Provider Config")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={goToProviders}
          >
            Notification Provider Config
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out rounded-lg ${
              isActive("Stocks Tracked")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={goToStocksTracked}
          >
            Stocks Tracked
          </button>
        </li>
      </ul>

      <div className="mt-auto">
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out flex gap-2 items-center">
              <IoMdHelpCircleOutline/>
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
