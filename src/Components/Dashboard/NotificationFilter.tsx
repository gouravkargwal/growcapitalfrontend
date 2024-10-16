"use client";
import {
  fetchUserNewsTypes,
  updateUserNewsTypes,
} from "@/Feature/News/newsSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const NotificationFilter = () => {
  const dispatch = useAppDispatch();
  const { data, loading, updateLoading } = useSelector(
    (state: RootState) => state.news
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    if (!loading && !updateLoading && !isAccordionOpen) {
      dispatch(fetchUserNewsTypes());
    }
    setIsAccordionOpen(!isAccordionOpen); // Toggle accordion state
  };

  const toggleSubscription = async (
    newsTypeId: number,
    isSubscribed: boolean
  ) => {
    if (!updateLoading) {
      dispatch(updateUserNewsTypes({ newsTypeId, isSubscribed }));
    }
  };

  return (
    <div className="mb-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Notification Filters</h2>
          <p className="text-sm text-gray-400 mb-4">
            Control the type of updates you receive on WhatsApp. Disable updates
            based on categories like technical analysis etc.
          </p>
        </div>
        <button
          onClick={toggleAccordion}
          className={`text-blue-400 border border-blue-500 rounded-2xl px-4 py-1 hover:text-white hover:bg-blue-500 ${
            loading || updateLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading || updateLoading}
        >
          {isAccordionOpen ? "Close" : "Open"}
        </button>
      </div>
      {loading ? (
        // Proper Skeleton Loading UI
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
          <h3 className="text-lg font-semibold mb-4">Loading...</h3>
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                </div>
                <div className="w-10 h-8 bg-gray-300 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        isAccordionOpen && (
          <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <h3 className="text-lg font-semibold mb-4">
              Select Notification Provider
            </h3>
            <div className="flex flex-col gap-3">
              {data.map((newsType) => (
                <label
                  key={newsType?.newsTypeId}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    !newsType?.isEligible
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : updateLoading
                      ? "bg-yellow-100"
                      : "bg-white"
                  }`}
                >
                  <span>{newsType?.newsTypeName}</span>
                  <input
                    type="checkbox"
                    className={`toggle-switch ${
                      !newsType?.isEligible || updateLoading
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    checked={newsType?.isSubscribed}
                    disabled={!newsType?.isEligible || updateLoading} // Disable if not eligible or during update
                    onChange={() =>
                      toggleSubscription(
                        newsType?.newsTypeId,
                        !newsType?.isSubscribed
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default NotificationFilter;
