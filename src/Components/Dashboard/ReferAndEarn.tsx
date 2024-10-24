"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ReferAndEarn = () => {
  const router = useRouter();

  const handleReferAndEarnClick = () => {
    router.push("/referAndEarn");
  };
  return (
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
  );
};

export default ReferAndEarn;
