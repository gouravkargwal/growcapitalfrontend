import { fetchRewards } from "@/Feature/Reward/rewardSlice";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Reward = () => {
  const dispatch = useAppDispatch();
  const { data: rewards, loading: rewardsLoading } = useSelector(
    (state: RootState) => state.reward
  );
  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);
  const handleClaimReward = (rewardId: string) => {
    dispatch(
      openSnackbar({
        message: `Claiming reward for reward ID: ${rewardId}`,
        severity: "success",
      })
    );
  };
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-12">
        Your Rewards
      </h3>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardsLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
          </div>
        ) : rewards?.length > 0 ? (
          rewards?.map((reward, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {reward.rewardType}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {reward.rewardAmount}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Referred: {reward.referralCount ?? 0}/
                {reward.referralCountRequired}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Eligible: {reward.isEligible ? "Yes" : "No"}
              </p>
              {reward.isEligible && (
                <button
                  onClick={() => handleClaimReward(reward.configId)}
                  className="mt-4 bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark transition-all duration-300"
                >
                  Claim
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            <h2 className="text-xl font-semibold">No Rewards Available</h2>
            <p className="mt-2 text-gray-500">
              Start referring people to earn rewards!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reward;
