import React, { useEffect } from "react";

import Image from "next/image";
import { RootState } from "@/Store/store";
import { auth } from "@/lib/firebase";
import avatar from "../../../assets/avatar.jpg";
import { fetchUserPlan } from "@/Feature/User/userSlice";
import moment from "moment";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useSelector((state: RootState) => state.user); // Include loading state

  // Fetch user plan data on mount
  useEffect(() => {
    dispatch(fetchUserPlan());
  }, [dispatch]);

  // Formatting functions
  const formatDate = (date: string) => {
    return moment(date).format("MMMM Do, YYYY"); // Use moment.js to format date
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="animate-pulse text-gray-500">Loading user info...</p>
      </div>
    );
  }

  // Fallback if no user data is available
  if (!data?.plan) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">
          User data is not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-center space-x-6">
        {/* User Profile Image */}
        <div className="mb-4 sm:mb-0">
          <Image
            src={auth?.currentUser?.photoURL || avatar}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* User Information */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {auth?.currentUser?.displayName || "Anonymous User"}
          </h1>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Plan Name:</p>
              <p className="font-semibold">{data?.plan?.planName || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Plan Start Date:</p>
              <p className="font-semibold">
                {data?.startDate ? formatDate(data.startDate) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Plan Price:</p>
              <p className="font-semibold">
                {data?.plan?.planPrice
                  ? formatPrice(data.plan.planPrice)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
