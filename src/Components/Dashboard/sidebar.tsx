"use client";
import React from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import avatar from "../../../assets/avatar.jpg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { PiLineVerticalBold } from "react-icons/pi";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  const goToDashboard = () => {
    router.push("/dashboard");
    closeSidebar();
  };

  const goToReferAndEarn = () => {
    router.push("/referAndEarn");
    closeSidebar();
  };

  const goToSubscription = () => {
    router.push("/subscriptions");
    closeSidebar();
  };

  const goToYourtimeline = () => {
    router.push("/yourtimeline");
    closeSidebar();
  };

  const goToProfileSettings = () => {
    router.push("/profileSettings");
    closeSidebar();
  };

  const goToProviders = () => {
    router.push("/providers");
    closeSidebar();
  };

  const goToStocksTracked = () => {
    router.push("/addStocks");
    closeSidebar();
  };

  const isActive = (path: string) => pathname === path;

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

      <div>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                isActive("/dashboard")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              } rounded-lg`}
              onClick={goToDashboard}
            >
              {isActive("/dashboard") && <PiLineVerticalBold />}
              Home
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                isActive("/yourtimeline")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              } rounded-lg`}
              onClick={goToYourtimeline}
            >
              {isActive("/yourtimeline") && <PiLineVerticalBold />}
              Your Timeline
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                isActive("/referAndEarn")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              } rounded-lg`}
              onClick={goToReferAndEarn}
            >
              {isActive("/referAndEarn") && <PiLineVerticalBold />}
              Refer And Earn
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                isActive("/subscriptions")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              } rounded-lg`}
              onClick={goToSubscription}
            >
              {isActive("/subscriptions") && <PiLineVerticalBold />}
              Subscriptions
            </button>

            <li>
              <button
                className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                  isActive("/profileSettings")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                } rounded-lg`}
                onClick={goToProfileSettings}
              >
                {isActive("/profileSettings") && <PiLineVerticalBold />}
                Profile Settings
              </button>
            </li>

            <li>
              <button
                className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                  isActive("/providers")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                } rounded-lg`}
                onClick={goToProviders}
              >
                {isActive("/providers") && <PiLineVerticalBold />}
                Notification Provider Config
              </button>
            </li>

            <li>
              <button
                className={`w-full text-left p-2 flex items-center transition-all duration-300 ease-in-out ${
                  isActive("/addStocks")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                } rounded-lg`}
                onClick={goToStocksTracked}
              >
                {isActive("/addStocks") && <PiLineVerticalBold />}
                Stocks Tracked
              </button>
            </li>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <ul className="space-y-2">
          <li className="flex-row flex items-center">
            <IoMdHelpCircleOutline />
            <button className="w-full text-left p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out">
              Help Center
            </button>
          </li>
          <li className="flex-row flex items-center">
            <CiLogout />
            <button
              className="w-full text-left p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in-out"
              onClick={() => {
                signOut(auth);
                closeSidebar();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
