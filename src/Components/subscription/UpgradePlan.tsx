import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hook/useAppDispatch";
import {
  fetchAllPlans,
  createPaymentOrderId,
  Plan,
  PlanState,
  pollPaymentStatus,
  paymentOverlay,
} from "@/Feature/Plan/planSlice";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { RootState } from "@/Store/store";

const UpgradePlan = () => {
  const dispatch = useAppDispatch();
  const { data: plans, loading: plansLoading } = useSelector<
    RootState,
    PlanState
  >((state) => state.plan);
  const { overlayStatus, updateUserPlanLoading } = useSelector(
    (state: RootState) => state.plan
  );
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [durationInMonths, setDurationInMonths] = useState<number>(1); // Default is 1 month

  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      dispatch(
        openSnackbar({ message: "Please select a plan.", severity: "warning" })
      );
      return;
    }

    const result = await dispatch(
      createPaymentOrderId({ planId: selectedPlan.planId, durationInMonths })
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
        handler: (response: any) => {
          const data = {
            orderCreationId: paymentOptions.order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Start polling for payment status after Razorpay dialog closes
          dispatch(pollPaymentStatus(paymentOptions.id));

          setSelectedPlan(null); // Reset the selected plan
          setDurationInMonths(1); // Reset duration
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
        openSnackbar({ message: "Opening payment window...", severity: "info" })
      );
      rzp.open();
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-textPrimary mb-6">
        Upgrade Your Plan
      </h2>
      {plansLoading ? (
        <div className="text-center">Loading plans...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 transition-transform transform hover:scale-105 ${
                selectedPlan?.planId === plan.planId
                  ? "border-primary shadow-xl"
                  : "border-gray-300"
              }`}
            >
              <h3 className="text-lg font-semibold text-textPrimary mb-4">
                {plan?.planName}
              </h3>

              {/* Plan Price */}
              {plan?.finalPrice ? (
                <div className="mb-4">
                  <p className="text-gray-400 line-through text-sm">
                    ₹{plan?.planPrice}
                  </p>
                  <p className="text-accent text-lg font-bold">
                    ₹{plan?.finalPrice}{" "}
                    <span className="text-sm text-accent">(Discounted)</span>
                  </p>
                </div>
              ) : (
                <p className="text-textPrimary text-lg font-semibold mb-4">
                  ₹{plan?.planPrice}
                </p>
              )}

              <p className="text-textSecondary text-sm mb-4">
                No description available
              </p>

              <button
                className={`w-full px-4 py-2 rounded-btn-lg transition text-white ${
                  selectedPlan?.planId === plan.planId
                    ? "bg-primary"
                    : "bg-gray-400 hover:bg-primary"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                {selectedPlan?.planId === plan.planId
                  ? "Selected"
                  : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Plan Options */}
      {selectedPlan && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-textPrimary">
            Choose Duration
          </h3>
          <label className="block mb-2 text-textSecondary">
            Duration (in months):
          </label>
          <input
            type="number"
            className="border p-2 rounded-md mb-2 w-full"
            value={durationInMonths}
            onChange={(e) => setDurationInMonths(Number(e.target.value))}
            min={1}
          />

          <button
            className="w-full px-4 py-2 rounded-btn-lg bg-primary text-white"
            onClick={handleUpgrade}
            disabled={updateUserPlanLoading || overlayStatus}
          >
            {updateUserPlanLoading || overlayStatus
              ? "Processing..."
              : "Upgrade Now"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpgradePlan;
