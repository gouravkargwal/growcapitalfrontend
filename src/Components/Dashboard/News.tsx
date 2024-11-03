"use client";
import React, { useEffect } from "react";
import NewsCard from "../UI/NewsCard";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchNews } from "@/Feature/News/newsSlice";
import { useRouter } from "next/navigation";

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
    <div className="mx-2 p-2">
      <h2 className="text-lg font-bold mb-2 md:text-2xl">Your Timeline</h2>
      <p className="text-gray-500 mb-4 md:text-base">
        Browse top news from your portfolio
      </p>

      {timelineData.length === 0 && !timelineDataLoading ? (
        <p className="text-center text-gray-500">
          No news available at the moment.
        </p>
      ) : (
        // Horizontal scrollable container with fixed height
        <div className="h-60 overflow-x-auto flex space-x-4 scrollbar-hide">
          {timelineData.map((card, index) => (
            <NewsCard
              key={index}
              title={card.title}
              date={card.readTime}
              imageUrl={card.imageSrc} // Use actual image URL
              className="w-48 flex-shrink-0 md:w-60 lg:w-72"
              isLoading={timelineDataLoading}
            />
          ))}
          <button
            className="rounded-lg flex-shrink-0 p-4 flex items-center justify-center hover:text-blue-500 transition duration-300"
            onClick={() => router.push("/news")}
          >
            <span className="text-lg text-gray-500 md:text-xl">
              More News →
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
