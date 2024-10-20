"use client";
import {
  fetchAllPlans,
  Plan,
  PlanState,
  upgradeUserPlan,
} from "@/Feature/Plan/planSlice";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { fetchUserPlan, UserState } from "@/Feature/User/userSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscriptions = () => {
  const dispatch = useAppDispatch();
  const { data: plans } = useSelector<RootState, PlanState>(
    (state) => state.plan
  );
  const { data: userPlan } = useSelector<RootState, UserState>(
    (state: RootState) => state.user
  );

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [activationType, setActivationType] = useState<
    "IMMEDIATE" | "AFTER_EXPIRY"
  >("IMMEDIATE");
  const [durationInMonths, setDurationInMonths] = useState<number>(1); // Default is 1 month

  useEffect(() => {
    dispatch(fetchAllPlans());
    dispatch(fetchUserPlan());
  }, [dispatch]);

  const billingHistory = [
    { date: "Sep 10, 2023", amount: "$20", status: "Paid" },
    { date: "Aug 10, 2023", amount: "$20", status: "Paid" },
    { date: "Jul 10, 2023", amount: "$20", status: "Paid" },
  ];

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      dispatch(
        openSnackbar({ message: "Please select a plan.", severity: "warning" })
      );
      return;
    }

    const result = await dispatch(
      upgradeUserPlan({
        userId: userPlan?.userId || "", // Assuming userPlan has userId
        planId: selectedPlan.planId,
        activationType,
        durationInMonths,
      })
    );
    if (upgradeUserPlan.fulfilled.match(result)) {
      setSelectedPlan(null); // Reset the plan selection
      setDurationInMonths(1); // Reset duration
      setActivationType("IMMEDIATE"); // Reset activation type
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-hero-title font-bold text-primary mb-6">
        Subscriptions
      </h1>

      {/* Current Plan */}
      <div className="bg-neutral shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-textPrimary">Current Plan</h2>
        <p className="text-textSecondary">
          You are currently subscribed to the{" "}
          <span className="font-bold">{userPlan?.plan?.planName}</span> plan.
        </p>
        <p className="text-textPrimary mt-2">
          ₹{userPlan?.plan?.finalPrice ?? userPlan?.plan?.planPrice}
        </p>
        <p className="text-textSecondary mt-2">
          {userPlan?.endDate
            ? (() => {
                const endDate = new Date(userPlan.endDate);
                if (isNaN(endDate.getTime())) {
                  return "Invalid End Date"; // Handle invalid date
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

      <div className="bg-neutral shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-textPrimary">
          Upgrade or Downgrade
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-lg p-4 ${
                selectedPlan?.planId === plan.planId ? "border-primary" : ""
              }`}
            >
              <h3 className="text-lg font-bold text-textPrimary">
                {plan?.planName}
              </h3>

              {/* Show finalPrice if available, otherwise show planPrice */}
              {plan?.finalPrice ? (
                <div>
                  <p className="text-textSecondary mt-2 line-through">
                    ₹{plan?.planPrice}
                  </p>
                  <p className="text-accent text-lg font-bold">
                    ₹{plan?.finalPrice}{" "}
                    <span className="text-sm text-accent">(Discounted)</span>
                  </p>
                </div>
              ) : (
                <p className="text-textPrimary mt-2">₹{plan?.planPrice}</p>
              )}

              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-btn-lg shadow-btn-shadow hover:bg-primary-light transition"
                onClick={() => setSelectedPlan(plan)}
              >
                {selectedPlan?.planId === plan.planId
                  ? "Selected"
                  : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Plan Options */}
        {selectedPlan && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-textPrimary">
              Choose Duration
            </h3>
            <label className="block mb-2 text-textSecondary">
              Duration (in months):
            </label>
            <input
              type="number"
              className="border p-2 rounded-md"
              value={durationInMonths}
              onChange={(e) => setDurationInMonths(Number(e.target.value))}
              min={1}
            />

            <h3 className="text-lg font-semibold mt-6 mb-2 text-textPrimary">
              Activation Type
            </h3>
            <div className="flex gap-4">
              <label className="text-textPrimary">
                <input
                  type="radio"
                  name="activationType"
                  value="IMMEDIATE"
                  checked={activationType === "IMMEDIATE"}
                  onChange={() => setActivationType("IMMEDIATE")}
                  className="mr-2"
                />
                Activate Immediately
              </label>
              <label className="text-textPrimary">
                <input
                  type="radio"
                  name="activationType"
                  value="AFTER_EXPIRY"
                  checked={activationType === "AFTER_EXPIRY"}
                  onChange={() => setActivationType("AFTER_EXPIRY")}
                  className="mr-2"
                />
                Activate After Current Plan Expiry
              </label>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-accent text-white rounded-btn-lg shadow-btn-shadow hover:bg-accent-light transition"
              onClick={handleUpgrade}
            >
              Confirm Plan Upgrade
            </button>
          </div>
        )}
      </div>

      {/* Billing History */}
      {/* <div className="bg-neutral shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Amount</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((item, index) => (
              <tr key={index}>
                <td className="py-2">{item.date}</td>
                <td className="py-2">{item.amount}</td>
                <td className="py-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Subscriptions;
