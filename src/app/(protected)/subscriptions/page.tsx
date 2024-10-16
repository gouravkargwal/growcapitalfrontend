"use client";
import { fetchAllPlans, upgradeUserPlan } from "@/Feature/Plan/planSlice";
import { fetchUserPlan } from "@/Feature/User/userSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscriptions = () => {
  const dispatch = useAppDispatch();
  const { data: plans } = useSelector((state: RootState) => state.plan);
  const { data: userPlan } = useSelector((state: RootState) => state.user);

  const [selectedPlan, setSelectedPlan] = useState(null);
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

  const handleUpgrade = () => {
    if (!selectedPlan) {
      alert("Please select a plan.");
      return;
    }

    // Dispatch the upgradeUserPlan action with the selected plan, activationType, and duration
    dispatch(
      upgradeUserPlan({
        userId: userPlan?.userId, // Assuming userPlan has userId
        planId: selectedPlan.planId,
        activationType,
        durationInMonths,
      })
    );
    alert(
      `Upgrading to ${selectedPlan.planName} for ${durationInMonths} month(s)`
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>

      {/* Current Plan */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Current Plan</h2>
        <p className="text-gray-600">
          You are currently subscribed to the{" "}
          <span className="font-bold">{userPlan?.plan?.planName}</span> plan.
        </p>
        <p className="text-gray-600 mt-2">₹{userPlan?.plan?.planPrice}</p>
        <p className="text-gray-600 mt-2">
          {userPlan?.endDate
            ? `End Date: ${new Date(userPlan.endDate)
                .getDate()
                .toString()
                .padStart(2, "0")} - ${new Date(
                userPlan.endDate
              ).toLocaleString("default", { month: "short" })} - ${new Date(
                userPlan.endDate
              ).getFullYear()} (${Math.ceil(
                (new Date(userPlan.endDate) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )} days left)`
            : "No End Date"}
        </p>
      </div>

      {/* Available Plans */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Upgrade or Downgrade</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-lg p-4 ${
                selectedPlan?.planId === plan.planId ? "border-blue-500" : ""
              }`}
            >
              <h3 className="text-lg font-bold">{plan?.planName}</h3>
              <p className="text-gray-600 mt-2">₹{plan?.planPrice}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
            <h3 className="text-lg font-semibold mb-2">Choose Duration</h3>
            <label className="block mb-2 text-gray-600">
              Duration (in months):
            </label>
            <input
              type="number"
              className="border p-2 rounded-md"
              value={durationInMonths}
              onChange={(e) => setDurationInMonths(Number(e.target.value))}
              min={1}
            />

            <h3 className="text-lg font-semibold mt-6 mb-2">Activation Type</h3>
            <div className="flex gap-4">
              <label>
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
              <label>
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
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={handleUpgrade}
            >
              Confirm Plan Upgrade
            </button>
          </div>
        )}
      </div>

      {/* Billing History */}
      {/* <div className="bg-white shadow-md rounded-lg p-6">
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
