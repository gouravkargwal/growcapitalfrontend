"use client";
import CurrentPlan from "@/Components/subscription/CurrentPlan";
import PlanHistory from "@/Components/subscription/PlanHistory";
import UpgradePlan from "@/Components/subscription/UpgradePlan";
import { logPageView } from "@/events/analytics";
import { PlanState } from "@/Feature/Plan/planSlice";
import { RootState } from "@/Store/store";
import Script from "next/script";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Subscriptions = () => {
  useEffect(() => { logPageView() }, []);
  const { overlayStatus } = useSelector<RootState, PlanState>(
    (state) => state.plan
  );
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container mx-auto p-6">
        {overlayStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
              <div className="animate-spin h-16 w-16 border-8 border-t-transparent border-primary rounded-full mx-auto"></div>
              <p className="mt-6 text-lg font-semibold text-textPrimary">
                Checking for payment status...
              </p>
              <p className="mt-2 text-gray-500 text-sm">
                Please wait while we confirm your payment.
              </p>
            </div>
          </div>
        )}

        <CurrentPlan />
        <UpgradePlan />
        {/* <ComparePlans /> */}
        <PlanHistory />
      </div>
    </>
  );
};

export default Subscriptions;
