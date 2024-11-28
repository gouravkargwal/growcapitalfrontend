"use client";
import { globalEnums } from "@/enum";
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
        <h2 className="text-lg font-bold text-gray-900">Refer and Earn</h2>
        <p className="text-sm text-gray-500 mb-4">
          Earn exciting rewards by sharing {globalEnums.brandName} with your
          friends.
        </p>
      </div>
      <button
        onClick={handleReferAndEarnClick}
        className="text-primary border border-secondary rounded-2xl px-3 lg:px-4 py-1 hover:text-white hover:bg-secondary whitespace-nowrap"
      >
        Refer now
      </button>
    </div>
  );
};

export default ReferAndEarn;
