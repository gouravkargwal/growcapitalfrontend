"use client";
import {
  fetchAllPlans,
  Plan,
  PlanState,
  paymentOverlay,
  createPaymentOrderId,
} from "@/Feature/Plan/planSlice";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { fetchUserPlan, UserState } from "@/Feature/User/userSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscriptions = () => {
  const dispatch = useAppDispatch();
  const { data: plans, overlayStatus } = useSelector<RootState, PlanState>(
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
      createPaymentOrderId({
        planId: selectedPlan.planId,
        activationType,
        durationInMonths,
      })
    );

    if (createPaymentOrderId.fulfilled.match(result)) {
      const paymentOptions = result.payload; // Options from backend

      // Initialize Razorpay
      const rzp = new window.Razorpay({
        key: paymentOptions.key_id,
        amount: paymentOptions.amount,
        currency: paymentOptions.currency,
        name: paymentOptions.name,
        description: paymentOptions.description,
        order_id: paymentOptions.order_id,
        handler: async function (response: any) {
          const data = {
            orderCreationId: paymentOptions.order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          if (res.isOk) {
            dispatch(
              openSnackbar({
                message: "Payment Successful!",
                severity: "success",
              })
            );
            dispatch(paymentOverlay(false));
          } else {
            dispatch(
              openSnackbar({
                message: res.message,
                severity: "error",
              })
            );
          }
        },
        prefill: {
          name: "Your Name", // Replace with user's name or dynamic value
          email: "user@example.com", // Replace with user's email or dynamic value
        },
        theme: {
          color: "#3399cc",
        },
      });

      rzp.on("payment.failed", function (response: any) {
        dispatch(
          openSnackbar({
            message: "Payment failed. Please try again.",
            severity: "error",
          })
        );
        dispatch(paymentOverlay(false));
      });

      dispatch(
        openSnackbar({
          message: "Opening payment window...",
          severity: "info",
        })
      );

      rzp.open();
      setSelectedPlan(null);
      setDurationInMonths(1);
      setActivationType("IMMEDIATE");
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container mx-auto p-6">
        {overlayStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-gray-600 rounded-full"></div>
              <p className="mt-4">Checking for payment status...</p>
            </div>
          </div>
        )}

        {/* Current Plan */}
        <div className="bg-neutral shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-textPrimary">
            Current Plan
          </h2>
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
    </>
  );
};

export default Subscriptions;
