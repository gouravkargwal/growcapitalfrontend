"use client";
import React, { useEffect } from "react";
import NewsCard from "../UI/NewsCard";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchNews } from "@/Feature/News/newsSlice";
import { useRouter } from "next/navigation";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="w-48 h-64 bg-gray-200 rounded-md animate-pulse flex-shrink-0 md:w-60 lg:w-72"></div>
);

const News = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { timelineData, timelineDataLoading, currentPage } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (currentPage === 1 && timelineData.length === 0) {
      dispatch(fetchNews({ page: 1, limit: 5 })); // Load initial data on mount
    }
  }, [dispatch, currentPage, timelineData.length]);

  return (
    <>
      <h2 className="text-lg font-bold mb-2 md:text-2xl">Your Timeline</h2>
      <p className="text-gray-500 mb-4 md:text-base">
        Browse top news from your portfolio
      </p>

      {timelineData.length === 0 && !timelineDataLoading ? (
        <p className="text-center text-gray-500">
          No news available at the moment.
        </p>
      ) : (
        <>
          {/* Outer container with a maximum width set using 100vw */}
          <div className="w-full max-w-[90vw] overflow-x-auto">
            <div className="flex space-x-4 h-72">
              {timelineDataLoading
                ? // Show Skeleton Loaders when data is loading
                  Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : // Show actual NewsCards when data is loaded
                  timelineData.map((card, index) => (
                    <NewsCard
                      key={index}
                      title={card.title}
                      date={card.readTime}
                      imageUrl="https://via.placeholder.com/150"
                      className="w-48 flex-shrink-0 md:w-60 lg:w-72"
                      isLoading={timelineDataLoading}
                    />
                  ))}
            </div>
          </div>

          {/* "More News" Button Positioned Separately */}
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-lg p-4 flex items-center justify-center hover:text-blue-500 transition duration-300"
              onClick={() => router.push("/news")}
            >
              <span className="text-lg text-gray-500 md:text-xl">
                More News →
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default News;
