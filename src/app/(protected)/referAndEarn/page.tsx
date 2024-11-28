"use client";

import Referrals from "@/Components/referAndEarn/Referrals";
import Reward from "@/Components/referAndEarn/Reward";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React from "react";
import { useSelector } from "react-redux";

const ReferAndEarn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading: referralsLoading } = useSelector(
    (state: RootState) => state.refer
  );

  const referralLink = `${process.env.NEXT_PUBLIC_FE_URL}/signup?referralCode=${data?.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    dispatch(
      openSnackbar({
        message: "Referral link copied to clipboard!",
        severity: "success",
      })
    );
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center text-gray-800">
        Spread the Word and Earn Rewards
      </h1>
      <p className="text-lg sm:text-xl mb-6 text-center text-gray-600">
        Get 40 credits for every person you refer to informe.in.
      </p>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Left Section */}
        <div className="lg:w-1/2 bg-white max-w-full rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Share Your Unique Referral Link
          </h3>
          {referralsLoading ? (
            <div className="animate-pulse h-10 bg-gray-200 rounded-lg"></div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full p-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-md"
              />
              <button
                onClick={handleCopy}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-all duration-300"
              >
                Copy
              </button>
            </div>
          )}

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-6 mt-6">
            {referralsLoading ? (
              <div className="flex space-x-4">
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
            ) : (
              <>
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
                  <img
                    src="https://img.icons8.com/color/48/000000/twitterx.png"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </button>
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </button>
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
                  <img
                    src="https://img.icons8.com/color/48/000000/linkedin.png"
                    alt="LinkedIn"
                    className="w-6 h-6"
                  />
                </button>
                <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
                  <img
                    src="https://img.icons8.com/color/48/000000/instagram-new.png"
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 p-8 rounded-lg shadow-xl">
          <h3 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-wide">
            How It Works
          </h3>
          <p className="text-gray-700 text-lg">
            Share your unique referral link with your friends and loved ones.
            When they sign up and join our community, both you and your friends
            will receive exclusive rewards as a token of appreciation.
          </p>
        </div>
      </div>

      {/* Referred People Cards */}
      <Referrals />
      <Reward />
    </div>
  );
};

export default ReferAndEarn;
