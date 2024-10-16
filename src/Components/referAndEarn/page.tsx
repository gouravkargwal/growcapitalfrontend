"use client";

import { fetchReferrals } from "@/Feature/Refer/referSlice";
import { fetchRewards } from "@/Feature/Reward/rewardSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ReferAndEarn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading: referralsLoading } = useSelector(
    (state: RootState) => state.refer
  );
  const { data: rewards, loading: rewardsLoading } = useSelector(
    (state: RootState) => state.reward
  );

  useEffect(() => {
    dispatch(fetchReferrals());
    dispatch(fetchRewards());
  }, [dispatch]);

  const referralLink = `${process.env.NEXT_PUBLIC_FE_URL}/signup?referralCode=${data?.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const handleClaimReward = (rewardId: string) => {
    alert(`Claiming reward for reward ID: ${rewardId}`);
  };

  return (
    <div className="my-6 p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Spread the word and earn rewards
      </h1>
      <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-lg">
        Get 40 credits for each person you refer to growcapital.ai
      </p>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-full">
        {/* Left Section */}
        <div className="lg:w-1/2 max-w-full">
          <div className="mb-6">
            <p className="font-semibold text-gray-700 mb-2">
              Share your unique referral link
            </p>
            {referralsLoading ? (
              <div className="animate-pulse h-10 bg-gray-200 rounded-lg"></div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:flex-wrap">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full mb-3 sm:mb-0 border border-gray-300 rounded-lg p-3 sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCopy}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto sm:ml-2"
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-4">
            {referralsLoading ? (
              <div className="flex space-x-4">
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
            ) : (
              <>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                  <img
                    src="https://img.icons8.com/color/48/000000/linkedin.png"
                    alt="LinkedIn"
                    className="w-6 h-6"
                  />
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
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
        <div className="lg:w-1/2 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm max-w-full">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
              Share your referral link
            </h3>
            <p className="text-gray-500 text-sm">
              Invite your friends to join growcapital.ai using your unique
              referral link.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
              Your friend joins
            </h3>
            <p className="text-gray-500 text-sm">
              When your friend joins through your shared link, they become a
              part of our community.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
              You both earn rewards
            </h3>
            <p className="text-gray-500 text-sm">
              As a token of appreciation, both you and your friend will receive
              40 credits each.
            </p>
          </div>
        </div>
      </div>

      {/* Referred People Table */}
      <div className="mt-8 max-w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          People You Have Referred
        </h2>
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-center">
                <th className="py-3 px-4 sm:py-4 sm:px-6">Name</th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">Date</th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {referralsLoading ? (
                <tr>
                  <td colSpan={3} className="py-4 px-6">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>
              ) : data?.records?.length > 0 ? (
                data.records.map((person, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-300 text-center"
                  >
                    <td className="py-3 px-4 sm:py-4 sm:px-6">{person.name}</td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6">{person.date}</td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6">
                      {person.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earned Rewards Table */}
      <div className="mt-8 w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Rewards
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] sm:min-w-full text-center bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-2 sm:py-4 sm:px-6">Reward Type</th>
                <th className="py-3 px-2 sm:py-4 sm:px-6">Reward Value</th>
                <th className="py-3 px-2 sm:py-4 sm:px-6">Referral Count</th>
                <th className="py-3 px-2 sm:py-4 sm:px-6">
                  Referral Count Required
                </th>
                <th className="py-3 px-2 sm:py-4 sm:px-6">Eligible</th>
                <th className="py-3 px-2 sm:py-4 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewardsLoading ? (
                <tr>
                  <td colSpan={6} className="py-4 px-6">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>
              ) : rewards?.length > 0 ? (
                rewards.map((reward, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-300"
                  >
                    <td className="py-3 px-2 sm:py-4 sm:px-6">
                      {reward?.rewardType}
                    </td>
                    <td className="py-3 px-2 sm:py-4 sm:px-6">
                      {reward?.rewardAmount}
                    </td>
                    <td className="py-3 px-2 sm:py-4 sm:px-6">
                      {reward?.referralCount ?? "0"}
                    </td>
                    <td className="py-3 px-2 sm:py-4 sm:px-6">
                      {reward?.referralCountRequired}
                    </td>
                    <td className="py-3 px-2 sm:py-4 sm:px-6">
                      {reward?.isEligible ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-2 sm:py-4 sm:px-6">
                      {reward?.isEligible && !reward?.claimed ? (
                        <button
                          onClick={() => handleClaimReward(reward.configId)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                          Claim Reward
                        </button>
                      ) : reward?.claimed ? (
                        <span className="text-gray-500">Claimed</span>
                      ) : (
                        <span className="text-gray-500">Not Eligible</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No rewards found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;
