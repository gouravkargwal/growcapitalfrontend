"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchNews } from "@/Feature/News/newsSlice";
import { useRouter } from "next/navigation";
import NewsCardSkeleton from "../UI/NewsCardSkeleton";
import NewsCard from "../UI/NewsCard";

const News = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { timelineData, timelineDataLoading, currentPage } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (currentPage === 1 && timelineData.length === 0) {
      dispatch(fetchNews({ page: 1, limit: 5 })); 
    }
  }, [dispatch, currentPage, timelineData.length]);
  return (
    <div>
      <h2 className="text-lg font-bold">Your Timeline</h2>
      <p className="text-gray-500 mb-4 md:text-base">
        Browse top news from your portfolio
      </p>

      {timelineData.length === 0 && !timelineDataLoading ? (
        <p className="text-center text-gray-500">No news available at the moment.</p>
      ) : (
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-1 overflow-x-scroll overflow-hidden w-full">
          {timelineDataLoading
          ? Array.from({ length: 4 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))
          : timelineData.slice(0, 4).map((card, index) => (
            <NewsCard
              key={index}
              title={card.title}
              date={card.readTime}
              imageUrl={card.imageSrc || "https://via.placeholder.com/150"}
              className="w-72 bg-blue-500"
              isLoading={timelineDataLoading}
            />
          ))}
          </div>
          {/* Button Section */}
          <div className="mt-4 flex justify-start">
            <button
              className="p-4 hover:text-blue-500"
              onClick={() => router.push("/news")}
            >
              <span className="text-lg text-gray-500 md:text-xl">More News →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default News;
