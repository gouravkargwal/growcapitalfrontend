import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAllPlans, PlanState } from "@/Feature/Plan/planSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { useRouter } from "next/navigation";

interface PlanProps {
  plan: {
    planId: number;
    planName: string;
    planPrice: number;
    finalPrice: number;
  };
  isHighlighted: boolean;
  onHighlight: (planName: string) => void;
  isMonthly: boolean;
}

// Hardcoded descriptions and features
const planDetails: Record<string, { description: string; features: string[] }> =
  {
    "Basic Plan": {
      description:
        "Ideal for individuals just starting out with stock market insights.",
      features: [
        "Access to daily stock news summaries",
        "Receive updates via Telegram for instant alerts",
        "Up to 10 stock news alerts per month",
      ],
    },
    "Pro Plan": {
      description:
        "Designed for professionals looking for advanced tools and insights.",
      features: [
        "All features in Basic Plan",
        "Receive updates via WhatsApp and Telegram for flexible communication",
        "Up to 50 stock news alerts per month",
        "Access to premium stock news summaries with in-depth analysis",
        "Priority customer support with quicker response times",
      ],
    },
    "Premium Plan": {
      description:
        "Tailored for large teams and businesses with comprehensive needs.",
      features: [
        "All features in Pro Plan",
        "Advanced sentiment analysis to understand market trends",
        "24/7 customer support with priority handling",
        "Upto 100 customizable stock news alerts and notifications",
      ],
    },
  };

const pricingVariant = {
  initial: { scale: 1, zIndex: 0 },
  hover: { scale: 1.08, zIndex: 1, transition: { duration: 0.2 } },
  highlighted: { scale: 1.1, zIndex: 2, transition: { duration: 0.3 } },
};

const PricingPlan: React.FC<PlanProps> = ({
  plan,
  isHighlighted,
  onHighlight,
  isMonthly,
}) => {
  const router = useRouter();

  const { description, features } = planDetails[plan.planName] || {};
  const monthlyPrice = plan.planPrice.toFixed(0);
  const finalMonthlyPrice = plan.finalPrice.toFixed(0);
  // const annualPrice = (monthlyPrice * 12).toFixed(0);
  // const finalAnnualPrice = (finalMonthlyPrice * 12).toFixed(0);

  return (
    <motion.div
      className={`${
        isHighlighted
          ? "border-2 border-primary bg-white text-primary shadow-xl transform scale-105"
          : "border border-gray-200 bg-gray-50 text-gray-700 shadow-md"
      } transition-all duration-300 rounded-xl p-8 hover:shadow-lg flex flex-col justify-between h-full`}
      variants={pricingVariant}
      initial="initial"
      animate={isHighlighted ? "highlighted" : "initial"}
      whileHover="hover"
      onMouseEnter={() => onHighlight(plan.planName)}
    >
      <h2 className="text-2xl font-semibold mb-3">{plan.planName}</h2>
      <p className="text-sm text-gray-500 mb-6">{description}</p>

      {/* Pricing Section */}
      <div className="text-4xl font-bold mb-6">
        {isMonthly ? (
          <>
            {monthlyPrice !== finalMonthlyPrice && (
              <span className="line-through mr-2 text-gray-400">
                ₹{monthlyPrice}
              </span>
            )}
            <span>₹{finalMonthlyPrice}</span>
            <span className="text-lg"> /month</span>
          </>
        ) : (
          <>
            {/* {annualPrice !== finalAnnualPrice && (
              <span className="line-through mr-2 text-gray-400">
                ₹{annualPrice}
              </span>
            )}
            <span>₹{finalAnnualPrice}</span>
            <span className="text-lg"> /year</span> */}
          </>
        )}
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-8">
        {features?.map((feature, index) => (
          <li key={index} className="flex items-center text-base text-left">
            <span className="mr-2 text-green-600">✓</span> {feature}
          </li>
        ))}
      </ul>

      {/* Call to Action Button */}
      <button
        className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors mt-auto ${
          isHighlighted
            ? "bg-primary text-white hover:bg-primary-dark"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => router.push("signup")}
      >
        {plan.planName === "Custom" ? "Book a Call" : "Get Started"}
      </button>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: plans } = useSelector<RootState, PlanState>(
    (state) => state.plan
  );
  const [highlighted, setHighlighted] = useState<string>("Pro Plan");
  const isMonthly = true; // State to toggle Monthly/Quarterly
  // const [isMonthly, setIsMonthly] = useState(true); // State to toggle Monthly/Quarterly
  // const toggleBilling = () => setIsMonthly(!isMonthly);

  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12">
      <div className="w-full max-w-6xl px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 mb-8">
          Select the plan that best fits your needs. Flexible billing options
          available!
        </p>

        {/* Toggle Monthly/Quarterly */}
        {/* <div className="flex justify-center items-center mb-10">
          <button
            className={`px-6 py-2 text-lg font-semibold rounded-l-lg ${
              isMonthly ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold rounded-r-lg ${
              !isMonthly ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsMonthly(false)}
          >
            Quarterly (Save 10%)
          </button>
        </div> */}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingPlan
              key={plan.planId}
              plan={plan}
              isHighlighted={highlighted === plan.planName}
              onHighlight={setHighlighted}
              isMonthly={isMonthly}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
