"use client";

import React, { useState } from "react";
import {
  fetchUserNewsTypes,
  updateUserNewsTypes,
} from "@/Feature/News/newsSlice";

import { RootState } from "@/Store/store";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";

const NotificationFilter = () => {
  const dispatch = useAppDispatch();
  const { data, loading, updateLoading } = useSelector(
    (state: RootState) => state.news
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Handle accordion toggle and fetch data if opening for the first time
  const toggleAccordion = () => {
    if (!loading && !updateLoading && !isAccordionOpen) {
      dispatch(fetchUserNewsTypes());
    }
    setIsAccordionOpen(!isAccordionOpen); // Toggle accordion state
  };

  // Handle toggling the subscription for a specific news type
  const toggleSubscription = async (
    newsTypeId: number,
    isSubscribed: boolean
  ) => {
    if (!updateLoading) {
      dispatch(updateUserNewsTypes({ newsTypeId, isSubscribed }));
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-900">Notification Sources</h2>
          <p className="text-sm text-gray-500 mb-4">
            Control the sources of updates you receive on your provider. Disable updates
            based on categories like nse, tweet, etc.
          </p>
        </div>
        <button
          onClick={toggleAccordion}
          className={`text-primary border border-secondary rounded-2xl px-4 py-1 hover:text-white hover:bg-secondary transition-colors ${loading || updateLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          disabled={loading || updateLoading}
        >
          {isAccordionOpen ? "Close" : "Open"}
        </button>
      </div>

      {/* Loading State for Skeleton Loader */}
      {loading ? (
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
          <h3 className="text-lg font-semibold mb-4">Loading...</h3>
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center justify-between"
              >
                <div className="h-8 bg-gray-300 rounded-lg w-3/4"></div>
                <div className="w-10 h-8 bg-gray-300 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        isAccordionOpen && (
          <div
            className="bg-gray-100 p-4 rounded-lg mt-2 transition-all duration-300 ease-in-out"
            style={{ maxHeight: isAccordionOpen ? "1000px" : "0px" }}
          >
            <h3 className="text-lg font-semibold mb-4">
              Select Notification Source
            </h3>

            {/* Show feedback if no data is available */}
            {data?.length === 0 ? (
              <p className="text-gray-500">No notification types available.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {data.map((newsType) => (
                  <label
                    key={newsType.newsTypeId}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${!newsType.isEligible
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : updateLoading
                        ? "bg-[#FDF8F1]"
                        : "bg-white hover:bg-[#FDF8F1]"
                      }`}
                  >
                    <span>{newsType.newsTypeName}</span>
                    <input
                      type="checkbox"
                      className={`h-5 w-5 cursor-pointer ${newsType.isSubscribed
                        ? "bg-primary border-primary"
                        : "bg-gray-300 border-gray-300"
                        }`}
                      checked={newsType.isSubscribed}
                      disabled={!newsType.isEligible || updateLoading}
                      onChange={() =>
                        toggleSubscription(
                          newsType.newsTypeId,
                          !newsType.isSubscribed
                        )
                      }
                    />
                  </label>
                ))}
              </div>
            )}

            {/* Loading state during update
            {updateLoading && (
              <p className="text-primary text-sm mt-2">
                Updating your preferences...
              </p>
            )} */}
          </div>
        )
      )}
    </div>
  );
};

export default NotificationFilter;
