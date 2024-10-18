"use client";

import Languages from "./Languages";
import NotificationFilter from "./NotificationFilter";
import React from "react";
import { useRouter } from "next/navigation";

const Settings: React.FC = () => {
  const router = useRouter();

  const handleReferAndEarnClick = () => {
    router.push("/referAndEarn");
  };

  return (
    <div className="mx-3 mt-5 text-black">
      <NotificationFilter />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Refer and Earn</h2>
          <p className="text-sm text-gray-400 mb-4">
            Earn exciting rewards by sharing Grow Capital with your friends.
          </p>
        </div>
        <button
          onClick={handleReferAndEarnClick}
          className="text-blue-400 border border-blue-500 rounded-2xl px-4 py-1 hover:text-white hover:bg-blue-500"
        >
          Refer now
        </button>
      </div>

      <Languages />

      {/* Current Plan Section */}
      <div className="mb-2">
        <h2 className="text-xl font-bold">Current Plan</h2>
        <p className="text-sm text-gray-400 mb-4">
          Premium plans provide faster and more qualitative updates.
        </p>

        <div className="bg-blue-500 p-6 rounded-lg relative">
          <div className="flex sm:justify-between items-start sm:items-center flex-col sm:flex-row justify-start ">
            <div>
              <h3 className="text-xl font-bold text-white">
                POWER_USER (TRIAL)
              </h3>
              <p className="text-sm text-gray-300 mb-4 sm:mb-0">
                Limited time, introductory free plan. Free of cost, full of
                high-quality AI filtered updates delivered on WhatsApp.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold text-white">OCT 12, 2024</p>
              <p className="text-sm text-gray-300">Expiry Date</p>
            </div>
          </div>

          <div className="mt-4 flex justify-start sm:justify-end">
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-green-600">
              Change Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
