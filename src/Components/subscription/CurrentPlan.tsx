import { fetchUserPlan, UserState } from "@/Feature/User/userSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentPlan = () => {
  const dispatch = useAppDispatch();
  const { data: userPlan } = useSelector<RootState, UserState>(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserPlan());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-r from-[#DF732D] to-[#f29e4f] shadow-lg rounded-xl p-6 mb-8 transform transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-extrabold text-white mb-4">Current Plan</h2>
      <div className="text-white opacity-80 mb-3">
        <p>
          You are currently subscribed to the{" "}
          <span className="font-semibold">{userPlan?.plan?.planName}</span>{" "}
          plan.
        </p>
        <p className="text-xl font-semibold mt-2">
          ₹{userPlan?.plan?.finalPrice ?? userPlan?.plan?.planPrice}
        </p>
      </div>
      <p className="text-white opacity-70 mt-2">
        {userPlan?.endDate
          ? (() => {
              const endDate = new Date(userPlan.endDate);
              if (isNaN(endDate.getTime())) {
                return "Invalid End Date";
              }
              const day = endDate.getDate().toString().padStart(2, "0");
              const month = endDate.toLocaleString("default", {
                month: "short",
              });
              const year = endDate.getFullYear();
              const daysLeft = Math.ceil(
                (endDate.getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return `End Date: ${day} - ${month} - ${year} (${daysLeft} days left)`;
            })()
          : "No End Date"}
      </p>
    </div>
  );
};

export default CurrentPlan;
